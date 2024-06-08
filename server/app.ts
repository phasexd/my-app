import {Hono} from 'hono';
import {logger} from 'hono/logger'
import { serveStatic } from 'hono/bun'
import { itemsRoutes } from './app/items';
import { cors } from 'hono/cors'

import type { PageConfig } from 'next'
import { handle } from '@hono/node-server/vercel'

export const config: PageConfig = {
    runtime: "edge",
  }

const app = new Hono()

app.use('*', logger())
app.use('/api/*', cors())

const apiRoutes = app.basePath("/api").route("/items",itemsRoutes)

app.get('*', serveStatic({ root: './frontend/dist'}))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))


export default app
export type ApiRoutes = typeof apiRoutes
export const GET = handle(app)
export const POST = handle(app)

