import { createHmac, timingSafeEqual } from 'node:crypto'
import type { H3Event } from 'h3'

export const ADMIN_COOKIE = 'memorial_admin'
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 14

function secrets() {
  const config = useRuntimeConfig()
  return {
    password: String(config.adminPassword || process.env.ADMIN_PASSWORD || ''),
    secret: String(
      config.adminSessionSecret ||
        process.env.ADMIN_SESSION_SECRET ||
        config.adminPassword ||
        process.env.ADMIN_PASSWORD ||
        'dev-session-secret',
    ),
  }
}

function secret() {
  return secrets().secret
}

export function adminPassword() {
  return secrets().password
}

export function isPasswordConfigured() {
  return Boolean(adminPassword())
}

export function passwordsMatch(input: string) {
  const expected = adminPassword()
  if (!expected || !input) return false
  const a = createHmac('sha256', secret()).update(input).digest()
  const b = createHmac('sha256', secret()).update(expected).digest()
  return timingSafeEqual(a, b)
}

export function signSession() {
  const expires = String(Date.now() + MAX_AGE_MS)
  const hmac = createHmac('sha256', secret()).update(expires).digest('hex')
  return `${expires}.${hmac}`
}

export function sessionIsValid(token: string | undefined) {
  if (!token) return false
  const i = token.lastIndexOf('.')
  if (i < 0) return false
  const expires = token.slice(0, i)
  const hmac = token.slice(i + 1)
  const expected = createHmac('sha256', secret()).update(expires).digest('hex')
  try {
    const ok = timingSafeEqual(Buffer.from(hmac), Buffer.from(expected))
    return ok && Date.now() < Number(expires)
  } catch {
    return false
  }
}

export function isAdmin(event: H3Event) {
  const token = getCookie(event, ADMIN_COOKIE)
  return sessionIsValid(token)
}

export function requireAdmin(event: H3Event) {
  if (!isAdmin(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Please log in as family admin.' })
  }
}

export function setAdminCookie(event: H3Event) {
  setCookie(event, ADMIN_COOKIE, signSession(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 14,
  })
}

export function clearAdminCookie(event: H3Event) {
  deleteCookie(event, ADMIN_COOKIE, { path: '/' })
}
