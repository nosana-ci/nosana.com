import { Client, type Market } from "@nosana/sdk";

export interface GPUItem {
  address: string;
  gpu: string;
  price: string;
  availability: string;
}

export interface CategorizedGPUs {
  premium: GPUItem[];
  community: GPUItem[];
  others: GPUItem[];
}

export async function getGPUMarkets(): Promise<CategorizedGPUs> {
  const categorized: CategorizedGPUs = {
    premium: [],
    community: [],
    others: [],
  };

  try {
    // 1. Fetch REST API data (name, slug, type, price) + running jobs
    const [marketsRes, runningRes] = await Promise.all([
      fetch("https://dashboard.k8s.prd.nos.ci/api/markets/"),
      fetch("https://dashboard.k8s.prd.nos.ci/api/jobs/running"),
    ]);

    if (!marketsRes.ok) {
      console.error(`Failed to fetch markets: ${marketsRes.statusText}`);
      return categorized;
    }

    const restMarkets = await marketsRes.json();

    let runningData: Record<string, { running: number }> = {};
    if (runningRes.ok) {
      runningData = await runningRes.json();
    }

    // 2. Fetch on-chain data from Nosana SDK (queue, queueType)
    const nosana = new Client("mainnet");
    const onChainMarkets: Market[] = await nosana.jobs.allMarkets();

    // Index REST API markets by address for O(1) lookup
    const restMap = new Map<string, any>();
    for (const m of restMarkets) {
      restMap.set(m.address, m);
    }

    // Iterate on-chain markets (same as Vue component iterates props.markets)
    for (const onChainMarket of onChainMarkets) {
      const addr: string = onChainMarket.address.toString();
      const running: number = runningData[addr]?.running ?? 0;
      const queueLength: number = onChainMarket.queue?.length ?? 0;
      const queueType = onChainMarket.queueType;

      // Look up REST API data for this market (name, slug, type, price)
      const marketInfo = restMap.get(addr);

      // Matches Vue component availability logic exactly:
      // queueType === 1 (NODE_QUEUE/FIFO): queue.length / (queue.length + running) hosts
      // other queueType:                   0 / running hosts
      let availability: string;
      if (queueType === 1) {
        const total = queueLength + running;
        availability = `${queueLength} / ${total} hosts`;
      } else {
        availability = `0 / ${running} hosts`;
      }

      const name: string = marketInfo?.name || addr;
      const isNvidia = marketInfo?.slug?.toLowerCase().startsWith("nvidia");
      const type = (marketInfo?.type || "").toUpperCase();

      const feeFactor = 1 + (marketInfo?.network_fee_percentage ?? 10) / 100;

      const item: GPUItem = {
        address: addr,
        gpu: name,
        price: marketInfo?.usd_reward_per_hour
          ? `$${(marketInfo.usd_reward_per_hour * feeFactor).toFixed(3)}/h`
          : "N/A",
        availability,
      };

      // If no market info exists in REST API, it goes to others (same as Vue)
      if (!marketInfo) {
        categorized.others.push(item);
      } else if (isNvidia && type === "PREMIUM") {
        categorized.premium.push(item);
      } else if (isNvidia && type === "COMMUNITY") {
        categorized.community.push(item);
      } else {
        categorized.others.push(item);
      }
    }

    // Sort by price ascending (N/A items at the top)
    // We return 0 for equal prices to preserve the original on-chain order (stable sort)
    const sortByPrice = (a: GPUItem, b: GPUItem) => {
      if (a.price === "N/A" && b.price === "N/A") return 0;
      if (a.price === "N/A") return -1;
      if (b.price === "N/A") return 1;

      const priceA = parseFloat(a.price.replace("$", ""));
      const priceB = parseFloat(b.price.replace("$", ""));

      return priceA - priceB;
    };
    categorized.premium.sort(sortByPrice);
    categorized.community.sort(sortByPrice);
    categorized.others.sort(sortByPrice);
  } catch (error) {
    console.error("Error loading GPU markets:", error);
  }

  return categorized;
}
