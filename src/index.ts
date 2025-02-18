import { Hono } from 'hono'
import { cors } from 'hono/cors'
import testRouter from './routes/test/test.route'
import chatRouter from './routes/chat/chat.route'

const app = new Hono()

// CORS restricting access to only the allowed origins
app.use("/*", cors({
  origin: ["http://localhost:5173", "https://budgetbuddy-xi.vercel.app"]
}))

// Health check endpoint
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// Routes
app.route('/test', testRouter)
app.route('/chat', chatRouter)

// Start the server
Bun.serve({
    port: 3000,
    fetch: app.fetch,
    idleTimeout: 255
})

export default app
