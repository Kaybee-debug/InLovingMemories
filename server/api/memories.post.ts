import type { Memory } from '../../../app/types/content'

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<Memory>>(event)
  if (!body?.quote?.trim() || !body?.name?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Please add your name and memory.' })
  }

  const content = await readContent()
  content.memories.unshift({
    quote: body.quote.trim(),
    name: body.name.trim(),
    relation: (body.relation || 'Friend').trim(),
    date: (body.date || new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })).trim(),
  })
  await writeContent(content)
  return { ok: true, memories: content.memories }
})
