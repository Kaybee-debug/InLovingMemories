export default defineEventHandler(async (event) => {
  if (!isPasswordConfigured()) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Set ADMIN_PASSWORD in Vercel environment variables first.',
    })
  }

  const body = await readBody<{ password?: string }>(event)
  if (!passwordsMatch(String(body?.password || ''))) {
    throw createError({ statusCode: 401, statusMessage: 'Wrong password.' })
  }

  setAdminCookie(event)
  return { ok: true }
})
