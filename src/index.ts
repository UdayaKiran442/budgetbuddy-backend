import { Hono } from 'hono'
import { cors } from 'hono/cors'
import testRouter from './routes/test/test.route'
import chatRouter from './routes/chat/chat.route'

const app = new Hono()

app.use("/*", cors({
  origin: ["http://localhost:5173","https://budgetbuddy-frontend-0ijm.onrender.com", "https://budgetbuddy-xi.vercel.app"]
}))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/test', testRouter)
app.route('/chat', chatRouter)

Bun.serve({
    port: 3000,
    fetch: app.fetch,
    idleTimeout: 255
})

export default app
