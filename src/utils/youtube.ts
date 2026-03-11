const API_KEY = import.meta.env.YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.YOUTUBE_CHANNEL_ID;

const SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const VIDEOS_URL = "https://www.googleapis.com/youtube/v3/videos";

export async function getYouTubeData() {

  const searchUrl =
    `${SEARCH_URL}?part=snippet` +
    `&channelId=${CHANNEL_ID}` +
    `&type=video` +
    `&order=date` +
    `&maxResults=50` +
    `&key=${API_KEY}`;

  const res = await fetch(searchUrl);
  const data = await res.json();

  const videos = data.items ?? [];

  const ids = videos.map((v: any) => v.id.videoId);

  const detailsRes = await fetch(
    `${VIDEOS_URL}?part=liveStreamingDetails&id=${ids.join(",")}&key=${API_KEY}`
  );

  const detailsData = await detailsRes.json();

  const detailsMap = new Map(
    detailsData.items.map((d: any) => [d.id, d.liveStreamingDetails])
  );

  const sessions = [];
  const communityCalls = [];

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
      watchUrl: `https://youtube.com/watch?v=${videoId}`
    };

    const details = detailsMap.get(videoId);

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

    // Detect community calls
    if (snippet.title.toLowerCase().includes("community call")) {

      const date = new Date(snippet.publishedAt);

      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });

      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short"
      });

      communityCalls.push({
        meeting: snippet.title,
        time: `${formattedDate} • ${formattedTime}`,
        recordingUrl: normalized.watchUrl
      });
    }
  }

  const featured =
    upcomingSession ||
    liveSession ||
    sessions[0] ||
    null;

  const moreSessions = sessions.filter(s => s.id !== featured?.id);

  return {
    featured,
    sessions: moreSessions,
    communityCalls,
    fetchedAt: new Date()
  };
}