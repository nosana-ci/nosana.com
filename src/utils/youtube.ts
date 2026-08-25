const API_KEY = import.meta.env.YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.YOUTUBE_CHANNEL_ID;

function extractDateFromTitle(title: string, uploadDate: Date): Date {
  const months = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december",
    "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"
  ];

  const monthNames = months.join("|");
  // Match "Month Day" or "Day Month", e.g., "May 29" or "29 May"
  const dateRegex = new RegExp(`(?:(${monthNames})[\\s,.]+(\\d{1,2})|(\\d{1,2})[\\s,.]+(${monthNames}))`, "i");

  const match = title.match(dateRegex);
  if (match) {
    const monthStr = (match[1] || match[4]).toLowerCase();
    const day = parseInt(match[2] || match[3], 10);

    let monthIndex = months.indexOf(monthStr);
    if (monthIndex !== -1) monthIndex = monthIndex % 12;

    const result = new Date(uploadDate);
    result.setUTCMonth(monthIndex);
    result.setUTCDate(day);

    return result;
  }

  return uploadDate;
}

// Titles and descriptions arrive HTML-escaped; both are rendered with textContent.
const ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'",
};

function decodeEntities(text: string): string {
  return text.replace(/&(?:#(\d+)|(\w+));/g, (m, dec, name) =>
    dec ? String.fromCodePoint(Number(dec)) : (ENTITIES[name] ?? m),
  );
}

const SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const VIDEOS_URL = "https://www.googleapis.com/youtube/v3/videos";
const PLAYLIST_ITEMS_URL = "https://www.googleapis.com/youtube/v3/playlistItems";
const COMMUNITY_CALLS_PLAYLIST_ID = "PLSGyz3VCGoSANR6adEtHBUm4u4Rad_mZz";

// search.list costs 100 quota units against a 10,000/day default; the other two
// cost 1. Memoised so a build makes one search, not one per consumer.
let cached: ReturnType<typeof loadYouTubeData> | null = null;

// A rejected key comes back as HTTP 200 with an `error` body, so res.ok alone
// is not enough to tell success from failure.
async function fetchJson(url: string, label: string) {
  const res = await fetch(url);
  const data = await res.json().catch(() => null);

  if (!res.ok || data?.error) {
    const err = data?.error;
    const reason = err?.errors?.[0]?.reason ?? `HTTP ${res.status}`;
    throw new Error(
      `[youtube] ${label} failed (${reason}): ${err?.message ?? res.statusText}`,
    );
  }

  return data;
}

export function getYouTubeData() {
  if (!cached) cached = loadYouTubeData();
  return cached;
}

async function loadYouTubeData() {
  if (!API_KEY || !CHANNEL_ID) {
    throw new Error(
      "[youtube] YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID must be set. In CI they " +
        "come from the project's CI/CD variables; locally they come from .env.",
    );
  }

  const searchUrl =
    `${SEARCH_URL}?part=snippet` +
    `&channelId=${CHANNEL_ID}` +
    `&type=video` +
    `&order=date` +
    `&maxResults=50` +
    `&key=${API_KEY}`;

  const playlistUrl =
    `${PLAYLIST_ITEMS_URL}?part=snippet,contentDetails` +
    `&playlistId=${COMMUNITY_CALLS_PLAYLIST_ID}` +
    `&maxResults=50` +
    `&key=${API_KEY}`;

  const [searchData, playlistData] = await Promise.all([
    fetchJson(searchUrl, "channel search"),
    fetchJson(playlistUrl, "community calls playlist"),
  ]);

  const videos = searchData?.items ?? [];
  const playlistItems = playlistData?.items ?? [];

  if (videos.length === 0 && playlistItems.length === 0) {
    throw new Error(
      `[youtube] the API accepted the key but returned no videos for channel ` +
        `${CHANNEL_ID} and no items for playlist ${COMMUNITY_CALLS_PLAYLIST_ID}.`,
    );
  }

  const sessions = [];

  let upcomingSession = null;
  let liveSession = null;

  if (videos.length) {
    const ids = videos.map((v: any) => v.id.videoId);

    const detailsData = await fetchJson(
      `${VIDEOS_URL}?part=liveStreamingDetails&id=${ids.join(",")}&key=${API_KEY}`,
      "livestream details",
    );

    const detailsMap = new Map(
      (detailsData.items ?? []).map((d: any) => [d.id, d.liveStreamingDetails]),
    );

    for (const video of videos) {
      const videoId = video.id.videoId;
      const snippet = video.snippet;

      const normalized: any = {
        id: videoId,
        title: decodeEntities(snippet.title),
        description: decodeEntities(snippet.description),
        thumbnail: snippet.thumbnails.high?.url,
        publishedAt: snippet.publishedAt,
        embedLink: `https://www.youtube-nocookie.com/embed/${videoId}`,
        watchUrl: `https://youtube.com/watch?v=${videoId}`,
      };

      const details = detailsMap.get(videoId);

      if (!details) continue;

      // Detect livestream state
      if (details?.scheduledStartTime && !details?.actualStartTime) {
        normalized.publishedAt = details.scheduledStartTime;
        normalized.isUpcoming = true;

        if (!upcomingSession) upcomingSession = normalized;
      }

      if (details?.actualStartTime && !details?.actualEndTime) {
        if (!liveSession) liveSession = normalized;
      }

      sessions.push(normalized);
    }
  }

  const communityCalls = playlistItems
    .map((item: any) => {
      const snippet = item.snippet;
      const contentDetails = item.contentDetails;
      const uploadDate = new Date(
        contentDetails?.videoPublishedAt || snippet.publishedAt,
      );

      const date = extractDateFromTitle(snippet.title, uploadDate);

      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      });

      return {
        time: formattedDate,
        recordingUrl: `https://youtube.com/watch?v=${snippet.resourceId.videoId}`,
        publishedAt: date,
      };
    })
    .sort((a: any, b: any) => a.publishedAt.getTime() - b.publishedAt.getTime())
    // Numbered oldest-first so a call keeps its number; rendered newest-first.
    .map(({ publishedAt, ...call }: any, index: number) => ({
      meeting: `#${index + 1}`,
      ...call,
    }))
    .reverse();

  const featured = upcomingSession || liveSession || sessions[0] || null;

  const moreSessions = sessions.filter((s) => s.id !== featured?.id);

  return {
    featured,
    sessions: moreSessions,
    communityCalls,
  };
}
