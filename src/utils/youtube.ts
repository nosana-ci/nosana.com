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



const SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const VIDEOS_URL = "https://www.googleapis.com/youtube/v3/videos";
const PLAYLIST_ITEMS_URL = "https://www.googleapis.com/youtube/v3/playlistItems";
const COMMUNITY_CALLS_PLAYLIST_ID = "PLSGyz3VCGoSANR6adEtHBUm4u4Rad_mZz";


export async function getYouTubeData() {
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

  const [searchRes, playlistRes] = await Promise.all([
    fetch(searchUrl),
    fetch(playlistUrl),
  ]);

  const [searchData, playlistData] = await Promise.all([
    searchRes.json(),
    playlistRes.json(),
  ]);

  const videos = searchData.items ?? [];
  const playlistItems = playlistData.items ?? [];

  if (videos.length === 0 && playlistItems.length === 0) {
    return {
      featured: null,
      sessions: [],
      communityCalls: [],
    };
  }


  const ids = videos.map((v: any) => v.id.videoId);

  const detailsRes = await fetch(
    `${VIDEOS_URL}?part=liveStreamingDetails&id=${ids.join(",")}&key=${API_KEY}`,
  );

  const detailsData = await detailsRes.json();

  const detailsMap = new Map(
    (detailsData.items ?? []).map((d: any) => [d.id, d.liveStreamingDetails]),
  );

  const sessions = [];


  let upcomingSession = null;
  let liveSession = null;

  for (const video of videos) {
    const videoId = video.id.videoId;
    const snippet = video.snippet;

    const normalized = {
      id: videoId,
      title: snippet.title,
      description: snippet.description,
      thumbnail: snippet.thumbnails.high?.url,
      publishedAt: snippet.publishedAt,
      embedLink: `https://www.youtube.com/embed/${videoId}`,
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

      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
        timeZone: "UTC",
      });



      return {
        meeting: snippet.title,
        time: `${formattedDate} • ${formattedTime}`,
        recordingUrl: `https://youtube.com/watch?v=${snippet.resourceId.videoId}`,
        publishedAt: date,
      };
    })
    .sort((a: any, b: any) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .map(({ publishedAt, ...rest }: any) => rest);


  const featured = upcomingSession || liveSession || sessions[0] || null;

  const moreSessions = sessions.filter((s) => s.id !== featured?.id);

  return {
    featured,
    sessions: moreSessions,
    communityCalls,
  };

}
