import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defaultContent } from '../../app/data/memorial'
import type { SiteContent } from '../../app/types/content'

const CONTENT_KEY = 'site-content'
const MEDIA_PREFIX = 'media/'

function localFile() {
  return join(process.cwd(), '.data', 'site-content.json')
}

async function blobStore() {
  if (!process.env.NETLIFY && !process.env.NETLIFY_BLOBS_CONTEXT) return null
  try {
    const { getStore } = await import('@netlify/blobs')
    return getStore({ name: 'memorial', consistency: 'strong' })
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
  const store = await blobStore()
  if (store) {
    const saved = (await store.get(CONTENT_KEY, { type: 'json' })) as Partial<SiteContent> | null
    return mergeContent(saved)
  }

  try {
    const raw = await readFile(localFile(), 'utf8')
    return mergeContent(JSON.parse(raw) as Partial<SiteContent>)
  } catch {
    return defaultContent
  }
}

export async function writeContent(content: SiteContent) {
  const store = await blobStore()
  if (store) {
    await store.setJSON(CONTENT_KEY, content)
    return
  }

  await mkdir(join(process.cwd(), '.data'), { recursive: true })
  await writeFile(localFile(), JSON.stringify(content, null, 2), 'utf8')
}

export async function saveMedia(id: string, data: Buffer, contentType: string) {
  const store = await blobStore()
  if (store) {
    await store.set(`${MEDIA_PREFIX}${id}`, data, { metadata: { contentType } })
    return `/api/media/${id}`
  }

  const uploads = join(process.cwd(), 'public', 'uploads')
  await mkdir(uploads, { recursive: true })
  const ext = contentType.includes('png') ? 'png' : contentType.includes('webp') ? 'webp' : 'jpg'
  const filename = `${id}.${ext}`
  await writeFile(join(uploads, filename), data)
  return `/uploads/${filename}`
}

export async function readMedia(id: string) {
  const store = await blobStore()
  if (!store) return null
  const key = `${MEDIA_PREFIX}${id}`
  const data = await store.get(key, { type: 'arrayBuffer' })
  if (!data) return null
  const meta = await store.getMetadata(key)
  return {
    data: Buffer.from(data),
    contentType: String(meta?.metadata?.contentType || 'image/jpeg'),
  }
}
