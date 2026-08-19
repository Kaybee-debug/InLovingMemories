export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const form = await readMultipartFormData(event)
  const file = form?.find((part) => part.name === 'file' && part.data?.length)
  if (!file) {
    throw createError({ statusCode: 400, statusMessage: 'Please choose a photo.' })
  }

  const type = file.type || 'image/jpeg'
  if (!type.startsWith('image/')) {
    throw createError({ statusCode: 400, statusMessage: 'Only image files can be uploaded.' })
  }

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const src = await saveMedia(id, file.data, type)
  return { src }
})
