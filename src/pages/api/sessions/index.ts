import type { APIRoute } from "astro";

const API_KEY = import.meta.env.YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.YOUTUBE_CHANNEL_ID;

const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

type EventType = "upcoming" | "live" | "completed";

type Session = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  embedLink: string;
  watchUrl: string;
  watchOnYoutube: string;
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

function normalize(item: any, isUpcoming: boolean = false): Session {
  const videoId = item.id.videoId;

  return {
    id: videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.high?.url,
    publishedAt: item.snippet.publishedAt,
    embedLink: `https://www.youtube.com/embed/${videoId}`,
    watchUrl: `https://youtube.com/watch?v=${videoId}`,
    watchOnYoutube: `https://youtube.com/watch?v=${videoId}`,
    isUpcoming,
  };
}

export const GET: APIRoute = async () => {
  let featured: any = null;

  // 1️⃣ Upcoming streams
  const upcoming = await fetchStreams("upcoming");

  if (upcoming.length > 0) {
    featured = normalize(upcoming[0], true);
  }

  // 2️⃣ If no upcoming → check live
  if (!featured) {
    const live = await fetchStreams("live");

    if (live.length > 0) {
      featured = normalize(live[0], false);
    }
  }

  // 3️⃣ Always fetch completed streams
  const completed = await fetchStreams("completed");
  const completedSessions: Session[] = completed.map((item: any) => normalize(item, false));

  // 4️⃣ If nothing featured yet → use latest completed
  if (!featured && completedSessions.length > 0) {
    featured = completedSessions[0];
  }

  // 5️⃣ Remove featured from list
  const moreSessions = completedSessions.filter(
    (s) => !featured || s.id !== featured.id
  );

  return new Response(
    JSON.stringify({
      featured,
      sessions: moreSessions,
    }),
    {
      headers: {
        "Content-Type": "application/json",

        // cache for 5 minutes to reduce API quota usage
        "Cache-Control": "public, max-age=300",
      },
    }
  );
};