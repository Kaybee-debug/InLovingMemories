import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defaultContent } from '../../app/data/memorial'
import type { SiteContent } from '../../app/types/content'

const CONTENT_PATH = 'memorial/site-content.json'

function localFile() {
  return join(process.cwd(), '.data', 'site-content.json')
}

function blobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN || ''
}

function onVercel() {
  return Boolean(process.env.VERCEL)
}

async function vercelPut(pathname: string, body: string | Buffer, contentType: string, cacheControlMaxAge = 0) {
  const { put } = await import('@vercel/blob')
  return put(pathname, body, {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType,
    token: blobToken() || undefined,
    cacheControlMaxAge,
  })
}

async function vercelReadJson(pathname: string) {
  const { head } = await import('@vercel/blob')
  try {
    const meta = await head(pathname, { token: blobToken() || undefined })
    const res = await fetch(meta.url, { cache: 'no-store' })
    if (!res.ok) return null
    return (await res.json()) as Partial<SiteContent>
  } catch {
    return null
  }
}

function mergeContent(saved: Partial<SiteContent> | null): SiteContent {
  if (!saved) return defaultContent
  return {
    ...defaultContent,
    ...saved,
    person: { ...defaultContent.person, ...saved.person },
    story: {
      ...defaultContent.story,
      ...saved.story,
      timeline: saved.story?.timeline || defaultContent.story.timeline,
    },
    family: {
      ...defaultContent.family,
      ...saved.family,
      grandparents: saved.family?.grandparents || defaultContent.family.grandparents,
      children: saved.family?.children || defaultContent.family.children,
      grandchildren: saved.family?.grandchildren || defaultContent.family.grandchildren,
      center: { ...defaultContent.family.center, ...saved.family?.center },
      wife: { ...defaultContent.family.wife, ...saved.family?.wife },
    },
    memories: saved.memories || defaultContent.memories,
    quotes: saved.quotes || defaultContent.quotes,
    gallery: saved.gallery || defaultContent.gallery,
    videos: saved.videos || defaultContent.videos,
    legacy: {
      ...defaultContent.legacy,
      ...saved.legacy,
      values: saved.legacy?.values || defaultContent.legacy.values,
      resting: { ...defaultContent.legacy.resting, ...saved.legacy?.resting },
    },
    anniversary: { ...defaultContent.anniversary, ...saved.anniversary },
  }
}

export async function readContent(): Promise<SiteContent> {
  if (blobToken()) {
    try {
      return mergeContent(await vercelReadJson(CONTENT_PATH))
    } catch {
      return defaultContent
    }
  }

  try {
    const raw = await readFile(localFile(), 'utf8')
    return mergeContent(JSON.parse(raw) as Partial<SiteContent>)
  } catch {
    return defaultContent
  }
}

export async function writeContent(content: SiteContent) {
  if (onVercel() && !blobToken()) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Add a Vercel Blob store so family edits can be saved.',
    })
  }

  if (blobToken()) {
    await vercelPut(CONTENT_PATH, JSON.stringify(content), 'application/json', 0)
    return
  }

  await mkdir(join(process.cwd(), '.data'), { recursive: true })
  await writeFile(localFile(), JSON.stringify(content, null, 2), 'utf8')
}

export async function saveMedia(id: string, data: Buffer, contentType: string) {
  const ext = contentType.includes('png') ? 'png' : contentType.includes('webp') ? 'webp' : 'jpg'

  if (onVercel() && !blobToken()) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Add a Vercel Blob store so photos can be uploaded.',
    })
  }

  if (blobToken()) {
    const blob = await vercelPut(`memorial/media/${id}.${ext}`, data, contentType, 60 * 60 * 24 * 365)
    return blob.url
  }

  const uploads = join(process.cwd(), 'public', 'uploads')
  await mkdir(uploads, { recursive: true })
  const filename = `${id}.${ext}`
  await writeFile(join(uploads, filename), data)
  return `/uploads/${filename}`
}
