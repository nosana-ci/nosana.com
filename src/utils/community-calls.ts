const API_KEY = import.meta.env.YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.YOUTUBE_CHANNEL_ID;

const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

export type CommunityCall = {
  meeting: string;
  time: string;
  recordingUrl: string;
};

export async function getCommunityCalls() {

  const url =
    `${BASE_URL}?part=snippet` +
    `&channelId=${CHANNEL_ID}` +
    `&type=video` +
    `&q=Community+Call` +
    `&order=date` +
    `&maxResults=50` +
    `&key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.error) {
    console.error("[Community Calls] Error:", data.error.message);
    return { calls: [], fetchedAt: new Date() };
  }

  const items = data.items || [];

  const filteredItems = items.filter((item: any) =>
    item.snippet.title.toLowerCase().includes("community call")
  );

  const calls: CommunityCall[] = filteredItems.map((item: any) => {

    const date = new Date(item.snippet.publishedAt);

    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });

    return {
      meeting: item.snippet.title,
      time: `${formattedDate} • ${formattedTime}`,
      recordingUrl: `https://youtube.com/watch?v=${item.id.videoId}`,
    };
  });

  return {
    calls,
    fetchedAt: new Date()
  };
}