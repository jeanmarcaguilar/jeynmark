const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_URL =
  'https://api.spotify.com/v1/me/player/currently-playing?additional_types=track,episode';
const PLAYER_URL = 'https://api.spotify.com/v1/me/player?additional_types=track,episode';
const RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

let accessToken = null;
let accessTokenExpiresAt = 0;

function basicAuth(clientId, clientSecret) {
  return Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
}

async function readSpotifyBody(response) {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { error: text.trim() };
  }
}

function spotifyErrorMessage(data) {
  if (typeof data.error === 'string') return data.error;
  if (typeof data.error?.message === 'string') return data.error.message;
  if (typeof data.error_description === 'string') return data.error_description;
  return '';
}

function isPremiumRequired(status, data) {
  const message = spotifyErrorMessage(data).toLowerCase();
  return status === 403 && message.includes('premium');
}

function mapItem(item, { isPlaying, progressMs, fetchedAt }) {
  if (!item) return null;

  const albumImages = item.album?.images || item.images || item.show?.images || [];
  const image = albumImages.find((img) => img.width >= 64) || albumImages[0];
  const artists = item.artists?.map((entry) => entry.name).filter(Boolean) || [];
  const artist = artists.join(', ') || item.show?.name || item.publisher || '';

  return {
    isPlaying,
    title: item.name,
    artist,
    album: item.album?.name || item.show?.name || '',
    albumImageUrl: image?.url || '',
    songUrl: item.external_urls?.spotify || '',
    trackId: item.id || item.uri || '',
    progressMs: progressMs ?? 0,
    durationMs: item.duration_ms ?? 0,
    fetchedAt,
  };
}

async function getAccessToken({ clientId, clientSecret, refreshToken }) {
  if (accessToken && Date.now() < accessTokenExpiresAt - 30_000) {
    return accessToken;
  }

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth(clientId, clientSecret)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  const data = await readSpotifyBody(response);
  if (!response.ok || !data.access_token) {
    const error = spotifyErrorMessage(data) || 'Spotify token refresh failed.';
    const body = { configured: true, error };
    if (isPremiumRequired(response.status, data)) body.premiumRequired = true;
    return Promise.reject(Object.assign(new Error(error), { status: response.status, body }));
  }

  accessToken = data.access_token;
  accessTokenExpiresAt = Date.now() + (data.expires_in ?? 3600) * 1000;
  return accessToken;
}

function playbackFrom(data, fetchedAt) {
  const item = data.item || data.track;
  return mapItem(item, {
    isPlaying: Boolean(data.is_playing),
    progressMs: data.progress_ms ?? 0,
    fetchedAt,
  });
}

export async function fetchSpotifyNowPlaying({ clientId, clientSecret, refreshToken }) {
  if (!clientId || !clientSecret || !refreshToken) {
    return { status: 200, body: { configured: false } };
  }

  try {
    const token = await getAccessToken({ clientId, clientSecret, refreshToken });
    const headers = { Authorization: `Bearer ${token}` };
    const fetchedAt = Date.now();

    const nowPlayingRes = await fetch(NOW_PLAYING_URL, { headers });
    const nowPlaying = await readSpotifyBody(nowPlayingRes);

    if (isPremiumRequired(nowPlayingRes.status, nowPlaying)) {
      return {
        status: 200,
        body: {
          configured: true,
          premiumRequired: true,
          error: spotifyErrorMessage(nowPlaying),
        },
      };
    }

    if (nowPlayingRes.status === 401) {
      accessToken = null;
      accessTokenExpiresAt = 0;
      return {
        status: 401,
        body: { configured: true, error: 'Spotify access token was rejected. Re-run the auth script.' },
      };
    }

    if (nowPlayingRes.ok) {
      const mapped = playbackFrom(nowPlaying, fetchedAt);
      if (mapped) return { status: 200, body: { configured: true, ...mapped } };
    }

    const playerRes = await fetch(PLAYER_URL, { headers });
    const player = await readSpotifyBody(playerRes);
    if (isPremiumRequired(playerRes.status, player)) {
      return {
        status: 200,
        body: {
          configured: true,
          premiumRequired: true,
          error: spotifyErrorMessage(player),
        },
      };
    }
    if (playerRes.ok) {
      const mapped = playbackFrom(player, fetchedAt);
      if (mapped) return { status: 200, body: { configured: true, ...mapped } };
    }

    const recentRes = await fetch(RECENTLY_PLAYED_URL, { headers });
    const recent = await readSpotifyBody(recentRes);
    if (isPremiumRequired(recentRes.status, recent)) {
      return {
        status: 200,
        body: {
          configured: true,
          premiumRequired: true,
          error: spotifyErrorMessage(recent),
        },
      };
    }
    if (recentRes.ok) {
      const mapped = mapItem(recent.items?.[0]?.track, {
        isPlaying: false,
        progressMs: 0,
        fetchedAt,
      });
      if (mapped) return { status: 200, body: { configured: true, ...mapped } };
    }

    return { status: 200, body: { configured: true, isPlaying: false } };
  } catch (error) {
    if (error.body) {
      return { status: error.status || 500, body: error.body };
    }
    return { status: 500, body: { configured: true, error: error.message } };
  }
}
