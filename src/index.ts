import { Hono } from 'hono'

import testRouter from './routes/test/test.route'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/test', testRouter)

Bun.serve({
    port: 3000,
    fetch: app.fetch,
    idleTimeout: 255
})

export default app
