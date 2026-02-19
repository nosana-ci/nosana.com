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
  const response = await fetch('https://dashboard.k8s.prd.nos.ci/api/markets/');
  if (!response.ok) {
    throw new Error(`Failed to fetch markets: ${response.statusText}`);
  }
  const data = await response.json();

  const categorized: CategorizedGPUs = {
    premium: [],
    community: [],
    others: []
  };

  data.forEach((market: any) => {
    const item: GPUItem = {
      address: market.address,
      gpu: market.name,
      price: market.usd_reward_per_hour
        ? `$${market.usd_reward_per_hour.toFixed(3)}/h`
        : market.nos_job_price_per_second > 0
          ? `${(market.nos_job_price_per_second * 3600).toFixed(2)} NOS/h`
          : '$0.000/h',
      availability: market.client ? "Active" : "Available",
    };

    const type = market.type?.toUpperCase();
    if (type === 'PREMIUM') {
      categorized.premium.push(item);
    } else if (type === 'COMMUNITY') {
      categorized.community.push(item);
    } else {
      categorized.others.push(item);
    }
  });

  return categorized;
}
