import { Hono } from 'hono'

import testRouter from './routes/test/test.route'
import chatRouter from './routes/chat/chat.route'

const app = new Hono()

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
