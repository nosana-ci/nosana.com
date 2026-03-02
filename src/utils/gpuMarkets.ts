import { Client, type Market } from "@nosana/sdk";

export interface GPUItem {
  address: string;
  gpu: string;
  priceDisplay: string;
  priceValue: number | null;
  series: string | null;
  availability: string;
}

export interface CategorizedGPUs {
  premium: GPUItem[];
  community: GPUItem[];
  others: GPUItem[];
}

function extractSeries(name: string, slug?: string): string | null {
  const source = `${name} ${slug ?? ""}`.toLowerCase();

  if (source.includes("4090") || source.includes("4080") || source.includes("4070")) {
    return "RTX 40 Series";
  }

  if (source.includes("3090") || source.includes("3080") || source.includes("3070")) {
    return "RTX 30 Series";
  }

  if (source.includes("5090") || source.includes("5080")) {
    return "RTX 50 Series";
  }

  if (source.includes("6000 ada")) return "6000 Ada";
  if (source.includes("a6000")) return "RTX A6000";
  if (source.includes("a5000")) return "RTX A5000";

  return "Other";
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

      const numericPrice =
        marketInfo?.usd_reward_per_hour != null
          ? marketInfo.usd_reward_per_hour * feeFactor
          : null;

      const item: GPUItem = {
        address: addr,
        gpu: name,
        priceDisplay: numericPrice != null
          ? `$${numericPrice.toFixed(3)}/h`
          : "N/A",
        priceValue: numericPrice,
        series: extractSeries(name, marketInfo?.slug),
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

    const sortByPrice = (a: GPUItem, b: GPUItem) => {
      if (a.priceValue == null && b.priceValue == null) return 0;
      if (a.priceValue == null) return -1;
      if (b.priceValue == null) return 1;

      return a.priceValue - b.priceValue;
    };

    categorized.premium.sort(sortByPrice);
    categorized.community.sort(sortByPrice);
    categorized.others.sort(sortByPrice);
  } catch (error) {
    console.error("Error loading GPU markets:", error);
  }

  return categorized;
}
