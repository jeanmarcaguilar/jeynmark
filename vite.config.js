import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fetchGithubContributions } from './lib/githubContributions.js'

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

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), githubContributionsPlugin(env)],
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
