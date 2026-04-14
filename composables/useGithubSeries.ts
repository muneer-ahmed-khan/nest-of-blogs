export type SeriesType = 'nodejs' | 'express'

export interface SeriesPost {
  slug: string
  title: string
  excerpt: string
  seriesType: SeriesType
  seriesLabel: string
  seriesNumber: number
  tags: string[]
  readTimeMinutes: number
  rawUrl: string
}

export interface SeriesPostWithContent extends SeriesPost {
  htmlContent: string
  fetchedAt: number
}

const EXPRESS_BASE = 'https://raw.githubusercontent.com/muneer-ahmed-khan/typescript-express-series/master'
const NODE_BASE    = 'https://raw.githubusercontent.com/muneer-ahmed-khan/typescript-node-series/master'

export const SERIES_POSTS: SeriesPost[] = [
  // ── TypeScript Express Series ────────────────────────────────────────
  { slug: 'express-01-getting-started', title: 'Getting Started with TypeScript & Express', seriesType: 'express', seriesLabel: 'TypeScript Express Series', seriesNumber: 1, excerpt: 'Set up a TypeScript Express project from scratch — tsconfig, ts-node, middleware, routing, and the Request/Response objects explained.', rawUrl: `${EXPRESS_BASE}/series-01/ReadMe.md`, tags: ['Express', 'TypeScript', 'Middleware'], readTimeMinutes: 8 },
  { slug: 'express-02-mongodb', title: 'Integrating MongoDB with TypeScript Express', seriesType: 'express', seriesLabel: 'TypeScript Express Series', seriesNumber: 2, excerpt: 'Connect MongoDB to your Express app using Mongoose — models, schemas, and full CRUD operations with TypeScript.', rawUrl: `${EXPRESS_BASE}/series-02/ReadMe.md`, tags: ['Express', 'MongoDB', 'Mongoose'], readTimeMinutes: 10 },
  { slug: 'express-03-error-handling', title: 'Express Error Handling in TypeScript', seriesType: 'express', seriesLabel: 'TypeScript Express Series', seriesNumber: 3, excerpt: 'Build robust error handling — error middleware, custom exception classes, and graceful error responses.', rawUrl: `${EXPRESS_BASE}/series-03/ReadMe.md`, tags: ['Express', 'TypeScript', 'Error Handling'], readTimeMinutes: 9 },
  { slug: 'express-04-error-middleware', title: 'Express Error Handling Middleware Deep Dive', seriesType: 'express', seriesLabel: 'TypeScript Express Series', seriesNumber: 4, excerpt: 'Chaining error handlers, async errors, and centralised error responses in a production Express API.', rawUrl: `${EXPRESS_BASE}/series-04/ReadMe.md`, tags: ['Express', 'Middleware', 'Error Handling'], readTimeMinutes: 8 },
  { slug: 'express-05-custom-exceptions', title: 'Custom Exceptions for Better Express APIs', seriesType: 'express', seriesLabel: 'TypeScript Express Series', seriesNumber: 5, excerpt: 'Design custom exception hierarchies in TypeScript to produce consistent, structured API error responses.', rawUrl: `${EXPRESS_BASE}/series-05/ReadMe.md`, tags: ['Express', 'TypeScript', 'API Design'], readTimeMinutes: 7 },
  { slug: 'express-06-advanced-error-handling', title: 'Advanced Error Handling Patterns in Express', seriesType: 'express', seriesLabel: 'TypeScript Express Series', seriesNumber: 6, excerpt: 'Production-grade error handling — validation errors, 404 handlers, async wrappers, and unhandled rejection guards.', rawUrl: `${EXPRESS_BASE}/series-06/ReadMe.md`, tags: ['Express', 'TypeScript', 'Production'], readTimeMinutes: 10 },
  // ── TypeScript Node.js Series ────────────────────────────────────────
  { slug: 'node-01-basics', title: 'The Basics of Node.js with TypeScript', seriesType: 'nodejs', seriesLabel: 'TypeScript Node.js Series', seriesNumber: 1, excerpt: 'Explore Node.js fundamentals — modules, the global object, process arguments, and the file system with TypeScript.', rawUrl: `${NODE_BASE}/series-01/ReadMe.md`, tags: ['Node.js', 'TypeScript', 'File System'], readTimeMinutes: 8 },
  { slug: 'node-02-event-emitter', title: 'The Synchronous Nature of EventEmitter', seriesType: 'nodejs', seriesLabel: 'TypeScript Node.js Series', seriesNumber: 2, excerpt: 'Understand how EventEmitter works synchronously under the hood and powers event-driven programming.', rawUrl: `${NODE_BASE}/series-02/ReadMe.md`, tags: ['Node.js', 'EventEmitter', 'Events'], readTimeMinutes: 7 },
  { slug: 'node-03-buffers', title: 'Buffers Demystified in Node.js', seriesType: 'nodejs', seriesLabel: 'TypeScript Node.js Series', seriesNumber: 3, excerpt: 'Master Buffers — Node.js\'s tool for handling raw binary data. Allocation, encoding, and real-world use cases.', rawUrl: `${NODE_BASE}/series-03/ReadMe.md`, tags: ['Node.js', 'Buffers', 'Binary Data'], readTimeMinutes: 8 },
  { slug: 'node-04-readable-streams', title: 'Understanding Readable Streams in Node.js', seriesType: 'nodejs', seriesLabel: 'TypeScript Node.js Series', seriesNumber: 4, excerpt: 'Dive into Readable Streams and learn to consume data efficiently without loading everything into memory.', rawUrl: `${NODE_BASE}/series-04/ReadMe.md`, tags: ['Node.js', 'Streams', 'Performance'], readTimeMinutes: 9 },
  { slug: 'node-05-writable-streams', title: 'Mastering Writable Streams in Node.js', seriesType: 'nodejs', seriesLabel: 'TypeScript Node.js Series', seriesNumber: 5, excerpt: 'Explore Writable Streams — backpressure handling and piping for smooth data pipelines.', rawUrl: `${NODE_BASE}/series-05/ReadMe.md`, tags: ['Node.js', 'Streams', 'Backpressure'], readTimeMinutes: 8 },
  { slug: 'node-06-http-requests', title: 'Sending HTTP Requests in Node.js', seriesType: 'nodejs', seriesLabel: 'TypeScript Node.js Series', seriesNumber: 6, excerpt: 'Make HTTP requests from Node.js using the built-in http/https modules — GET, POST, and handling responses.', rawUrl: `${NODE_BASE}/series-06/ReadMe.md`, tags: ['Node.js', 'HTTP', 'Networking'], readTimeMinutes: 7 },
  { slug: 'node-07-http-server', title: 'Creating an HTTP Server in Node.js', seriesType: 'nodejs', seriesLabel: 'TypeScript Node.js Series', seriesNumber: 7, excerpt: 'Build a raw HTTP server from scratch, handle routing manually, and understand the request/response lifecycle.', rawUrl: `${NODE_BASE}/series-07/ReadMe.md`, tags: ['Node.js', 'HTTP Server', 'Networking'], readTimeMinutes: 9 },
  { slug: 'node-08-https-openssl', title: 'Implementing HTTPS with Your Own OpenSSL Certificate', seriesType: 'nodejs', seriesLabel: 'TypeScript Node.js Series', seriesNumber: 8, excerpt: 'Secure your Node.js server with HTTPS using a self-signed OpenSSL certificate — step by step.', rawUrl: `${NODE_BASE}/series-08/ReadMe.md`, tags: ['Node.js', 'HTTPS', 'Security'], readTimeMinutes: 8 },
  { slug: 'node-09-event-loop', title: 'Navigating the Node.js Event Loop', seriesType: 'nodejs', seriesLabel: 'TypeScript Node.js Series', seriesNumber: 9, excerpt: 'Deep understanding of the Event Loop — phases, microtasks, macrotasks, and how async code really runs.', rawUrl: `${NODE_BASE}/series-09/ReadMe.md`, tags: ['Node.js', 'Event Loop', 'Async'], readTimeMinutes: 11 },
  { slug: 'node-10-child-processes', title: 'Creating Child Processes in Node.js', seriesType: 'nodejs', seriesLabel: 'TypeScript Node.js Series', seriesNumber: 10, excerpt: 'Spawn child processes with spawn, exec, fork — parallelise CPU-bound work and communicate between processes.', rawUrl: `${NODE_BASE}/series-10/ReadMe.md`, tags: ['Node.js', 'Child Processes', 'Performance'], readTimeMinutes: 9 },
  { slug: 'node-11-clustering', title: 'Node.js Cluster: Sharing Workload Between Processes', seriesType: 'nodejs', seriesLabel: 'TypeScript Node.js Series', seriesNumber: 11, excerpt: 'Use the cluster module for multi-core CPUs — master/worker architecture and zero-downtime restarts.', rawUrl: `${NODE_BASE}/series-11/ReadMe.md`, tags: ['Node.js', 'Cluster', 'Scalability'], readTimeMinutes: 10 },
  { slug: 'node-12-http2', title: 'HTTP/2 in Node.js', seriesType: 'nodejs', seriesLabel: 'TypeScript Node.js Series', seriesNumber: 12, excerpt: 'Implement HTTP/2 — server push, multiplexing, header compression, and why it matters for performance.', rawUrl: `${NODE_BASE}/series-12/ReadMe.md`, tags: ['Node.js', 'HTTP/2', 'Performance'], readTimeMinutes: 9 },
  { slug: 'node-13-worker-threads', title: 'Worker Threads in Node.js', seriesType: 'nodejs', seriesLabel: 'TypeScript Node.js Series', seriesNumber: 13, excerpt: 'Offload CPU-intensive work to Worker Threads — SharedArrayBuffer, message passing, and thread pools.', rawUrl: `${NODE_BASE}/series-13/ReadMe.md`, tags: ['Node.js', 'Worker Threads', 'Concurrency'], readTimeMinutes: 10 },
  { slug: 'node-14-performance-hooks', title: 'Performance Hooks in Node.js', seriesType: 'nodejs', seriesLabel: 'TypeScript Node.js Series', seriesNumber: 14, excerpt: 'Measure and profile your Node.js applications using the built-in perf_hooks API — marks, measures, Observer.', rawUrl: `${NODE_BASE}/series-14/ReadMe.md`, tags: ['Node.js', 'Performance', 'Profiling'], readTimeMinutes: 8 },
]

export const EXPRESS_POSTS = SERIES_POSTS.filter(p => p.seriesType === 'express')
export const NODE_POSTS    = SERIES_POSTS.filter(p => p.seriesType === 'nodejs')

// Cache: slug → { html, ts }
const _cache = new Map<string, { html: string; fetchedAt: number }>()
const CACHE_TTL = 10 * 60 * 1000

function rewriteImageUrls(html: string, rawUrl: string): string {
  const base = rawUrl.substring(0, rawUrl.lastIndexOf('/') + 1)
  return html.replace(
    /(<img[^>]+src=["'])(?!https?:\/\/|\/\/)(\.\/)?([^"']+)(["'])/gi,
    (_, prefix, _dot, path, suffix) => `${prefix}${base}${path}${suffix}`,
  )
}

function addHeadingIds(html: string): string {
  const counter: Record<string, number> = {}
  return html.replace(/<(h[1-4])>([\s\S]*?)<\/h[1-4]>/gi, (_, tag, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').trim()
    const base = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
    counter[base] = (counter[base] ?? 0) + 1
    const id = counter[base] > 1 ? `${base}-${counter[base]}` : base
    return `<${tag} id="${id}">${inner}</${tag}>`
  })
}

export function useGithubSeries() {
  const loading = ref(false)
  const error   = ref<string | null>(null)

  function findPost(slug: string) {
    return SERIES_POSTS.find(p => p.slug === slug) ?? null
  }

  function adjacentPosts(slug: string) {
    const idx = SERIES_POSTS.findIndex(p => p.slug === slug)
    return {
      prev: idx > 0 ? SERIES_POSTS[idx - 1] : null,
      next: idx < SERIES_POSTS.length - 1 ? SERIES_POSTS[idx + 1] : null,
    }
  }

  async function fetchPostContent(slug: string): Promise<SeriesPostWithContent | null> {
    const source = findPost(slug)
    if (!source) { error.value = 'Post not found.'; return null }

    // Cache hit
    const cached = _cache.get(slug)
    if (cached && Date.now() - cached.fetchedAt < CACHE_TTL) {
      return { ...source, htmlContent: cached.html, fetchedAt: cached.fetchedAt }
    }

    loading.value = true
    error.value   = null

    try {
      const res = await fetch(source.rawUrl)
      if (!res.ok) throw new Error(`GitHub returned ${res.status}`)
      const md = await res.text()

      // Dynamic import for SSR safety
      const { Marked }          = await import('marked')
      const DOMPurify           = (await import('dompurify')).default

      // marked v18 — synchronous parse via instance
      const m = new Marked({ gfm: true, breaks: false })
      let html = m.parse(md) as string
      html = rewriteImageUrls(html, source.rawUrl)
      html = addHeadingIds(html)
      const clean = DOMPurify.sanitize(html, { ADD_ATTR: ['id', 'class'], ADD_TAGS: ['pre', 'code'] })

      _cache.set(slug, { html: clean, fetchedAt: Date.now() })
      return { ...source, htmlContent: clean, fetchedAt: Date.now() }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load post.'
      return null
    } finally {
      loading.value = false
    }
  }

  return { loading, error, findPost, adjacentPosts, fetchPostContent, SERIES_POSTS, EXPRESS_POSTS, NODE_POSTS }
}
