import type { SiteContent } from '../../../app/types/content'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const body = await readBody<SiteContent>(event)
  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid content.' })
  }
  await writeContent(body)
  return { ok: true }
})
