const API_KEY = import.meta.env.YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.YOUTUBE_CHANNEL_ID;

const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

type EventType = "upcoming" | "live" | "completed";

export type Session = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  embedLink: string;
  watchUrl: string;
  isUpcoming?: boolean;
};

async function fetchStreams(type: EventType) {
  const url =
    `${BASE_URL}?part=snippet` +
    `&channelId=${CHANNEL_ID}` +
    `&type=video` +
    `&eventType=${type}` +
    `&maxResults=20` +
    `&key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.items ?? [];
}

function normalize(item: any, isUpcoming = false): Session {
  const videoId = item.id.videoId;

  return {
    id: videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.high?.url,
    publishedAt: item.snippet.publishedAt,
    embedLink: `https://www.youtube.com/embed/${videoId}`,
    watchUrl: `https://youtube.com/watch?v=${videoId}`,
    isUpcoming,
  };
}

async function fetchVideoDetails(videoId: string) {
  const url =
    `https://www.googleapis.com/youtube/v3/videos` +
    `?part=liveStreamingDetails&id=${videoId}&key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.items?.[0]?.liveStreamingDetails ?? null;
}

export async function getSessions() {

  let featured: Session | null = null;

  const upcoming = await fetchStreams("upcoming");

  if (upcoming.length) {
    featured = normalize(upcoming[0], true);

    const details = await fetchVideoDetails(featured.id);

    if (details?.scheduledStartTime) {
      featured.publishedAt = details.scheduledStartTime;
    }
  }

  if (!featured) {
    const live = await fetchStreams("live");

    if (live.length) {
      featured = normalize(live[0]);
    }
  }

  const completed = await fetchStreams("completed");
  const completedSessions = completed.map((item: any) => normalize(item));

  if (!featured && completedSessions.length) {
    featured = completedSessions[0];
  }

  const moreSessions = completedSessions.filter(
    (s) => !featured || s.id !== featured.id
  );

  return {
    featured,
    sessions: moreSessions
  };
}