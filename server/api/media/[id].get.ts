export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing image id.' })
  }

  const media = await readMedia(id)
  if (!media) {
    throw createError({ statusCode: 404, statusMessage: 'Image not found.' })
  }

  setHeader(event, 'Content-Type', media.contentType)
  setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
  return media.data
})
