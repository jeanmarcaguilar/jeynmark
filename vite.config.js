import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fetchGithubContributions } from './lib/githubContributions.js'
import { fetchSpotifyNowPlaying } from './lib/spotifyNowPlaying.js'
import { isValidId, readJsonBody, updateLiveViewers } from './lib/liveViewers.js'

function githubContributionsPlugin(env) {
  let memoryCache = null
  let memoryCachedAt = 0
  const MEMORY_TTL_MS = 5 * 60 * 1000

  const handle = async (req, res, next) => {
    const pathname = req.url?.split('?')[0]
    if (pathname !== '/api/github-contributions') {
      next()
      return
    }

    try {
      if (memoryCache && Date.now() - memoryCachedAt < MEMORY_TTL_MS) {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Cache-Control', 'public, max-age=300')
        res.end(JSON.stringify(memoryCache))
        return
      }

      const { status, body } = await fetchGithubContributions({
        token: env.GITHUB_TOKEN,
        username: env.VITE_GITHUB_USERNAME || 'jeanmarcaguilar',
        year: new Date().getFullYear(),
      })
      if (status === 200) {
        memoryCache = body
        memoryCachedAt = Date.now()
      }
      res.statusCode = status
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Cache-Control', 'public, max-age=300')
      res.end(JSON.stringify(body))
    } catch (error) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: error.message }))
    }
  }

  return {
    name: 'github-contributions-api',
    configureServer(server) {
      server.middlewares.use(handle)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handle)
    },
  }
}

function spotifyNowPlayingPlugin(env) {
  let memoryCache = null
  let memoryCachedAt = 0
  const MEMORY_TTL_MS = 8 * 1000

  const handle = async (req, res, next) => {
    const pathname = req.url?.split('?')[0]
    if (pathname !== '/api/spotify-now-playing') {
      next()
      return
    }

    try {
      if (memoryCache && Date.now() - memoryCachedAt < MEMORY_TTL_MS) {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Cache-Control', 'public, max-age=8')
        res.end(JSON.stringify(memoryCache))
        return
      }

      const { status, body } = await fetchSpotifyNowPlaying({
        clientId: env.SPOTIFY_CLIENT_ID,
        clientSecret: env.SPOTIFY_CLIENT_SECRET,
        refreshToken: env.SPOTIFY_REFRESH_TOKEN,
      })
      if (status === 200) {
        memoryCache = body
        memoryCachedAt = Date.now()
      }
      res.statusCode = status
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Cache-Control', body?.configured === false ? 'no-store' : 'public, max-age=8')
      res.end(JSON.stringify(body))
    } catch (error) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: error.message }))
    }
  }

  return {
    name: 'spotify-now-playing-api',
    configureServer(server) {
      server.middlewares.use(handle)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handle)
    },
  }
}

function liveViewersPlugin(env) {
  const handle = async (req, res, next) => {
    const pathname = req.url?.split('?')[0]
    if (pathname !== '/api/live-viewers') {
      next()
      return
    }

    if (req.method !== 'GET' && req.method !== 'POST') {
      res.statusCode = 405
      res.setHeader('Allow', 'GET, POST')
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Method not allowed' }))
      return
    }

    try {
      let id
      let leave = false
      if (req.method === 'POST') {
        const payload = await readJsonBody(req)
        id = payload.id
        leave = Boolean(payload.leave)
        if (!isValidId(id)) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'A valid viewer id is required.' }))
          return
        }
      }

      const { status, body } = await updateLiveViewers({ env, id, leave })
      res.statusCode = status
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Cache-Control', 'no-store')
      res.end(JSON.stringify(body))
    } catch (error) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: error.message }))
    }
  }

  return {
    name: 'live-viewers-api',
    configureServer(server) {
      server.middlewares.use(handle)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handle)
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), githubContributionsPlugin(env), spotifyNowPlayingPlugin(env), liveViewersPlugin(env)],
    server: {
      port: 5173,
      open: true
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'motion-vendor';
            }
          }
        }
      }
    }
  }
})
