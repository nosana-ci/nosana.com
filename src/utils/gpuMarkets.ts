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
  const [marketsRes, runningRes] = await Promise.all([
    fetch("https://dashboard.k8s.prd.nos.ci/api/markets/"),
    fetch("https://dashboard.k8s.prd.nos.ci/api/jobs/running"),
  ]);

  if (!marketsRes.ok) throw new Error(`Failed to fetch markets: ${marketsRes.statusText}`);

  const restMarkets = await marketsRes.json();

  let runningData: Record<string, { running: number }> = {};
  if (runningRes.ok) {
    runningData = await runningRes.json();
  }

  const categorized: CategorizedGPUs = {
    premium: [],
    community: [],
    others: [],
  };

  for (const market of restMarkets) {
    const addr: string = market.address;
    const running: number = runningData[addr]?.running ?? 0;

    const item: GPUItem = {
      address: addr,
      gpu: market.name,
      price: market.usd_reward_per_hour
        ? `$${market.usd_reward_per_hour.toFixed(3)}/h`
        : market.nos_job_price_per_second > 0
          ? `${(market.nos_job_price_per_second * 3600).toFixed(2)} NOS/h`
          : "$0.000/h",
      availability: running > 0 ? `${running} available` : "Unavailable",
    };

    const type = market.type?.toUpperCase();
    if (type === "PREMIUM") {
      categorized.premium.push(item);
    } else if (type === "COMMUNITY") {
      categorized.community.push(item);
    } else {
      categorized.others.push(item);
    }
  }

  return categorized;
}
