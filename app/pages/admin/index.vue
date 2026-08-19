<script setup lang="ts">
import { defaultContent, galleryFilters, relationOptions } from '~/data/memorial'
import type { GalleryPhoto, Person, SiteContent } from '~/types/content'

definePageMeta({ layout: 'admin' })
useSeoMeta({ title: 'Family admin — In Loving Memory', robots: 'noindex, nofollow' })

const session = ref({ authenticated: false, configured: true })
const password = ref('')
const loginError = ref('')
const saving = ref(false)
const savedAt = ref('')
const saveError = ref('')
const section = ref('about')
const draft = ref<SiteContent>(structuredClone(defaultContent))
const uploading = ref(false)

const sections = [
  { id: 'about', label: 'About him' },
  { id: 'story', label: 'His story' },
  { id: 'family', label: 'Family' },
  { id: 'memories', label: 'Memories' },
  { id: 'quotes', label: 'Quotes' },
  { id: 'gallery', label: 'Photos' },
  { id: 'videos', label: 'Videos' },
  { id: 'legacy', label: 'Legacy' },
]

async function loadSession() {
  session.value = await $fetch('/api/admin/session')
  if (session.value.authenticated) {
    draft.value = await $fetch<SiteContent>('/api/content')
  }
}

async function login() {
  loginError.value = ''
  try {
    await $fetch('/api/admin/login', { method: 'POST', body: { password: password.value } })
    password.value = ''
    await loadSession()
  } catch (error: unknown) {
    const err = error as { data?: { statusMessage?: string }; statusMessage?: string }
    loginError.value = err.data?.statusMessage || err.statusMessage || 'Could not log in.'
  }
}

async function logout() {
  await $fetch('/api/admin/logout', { method: 'POST' })
  session.value.authenticated = false
}

async function save() {
  saving.value = true
  saveError.value = ''
  savedAt.value = ''
  try {
    await $fetch('/api/admin/content', { method: 'PUT', body: draft.value })
    savedAt.value = new Date().toLocaleTimeString()
    await refreshNuxtData('site-content')
  } catch (error: unknown) {
    const err = error as { data?: { statusMessage?: string }; statusMessage?: string }
    saveError.value = err.data?.statusMessage || err.statusMessage || 'Could not save.'
  } finally {
    saving.value = false
  }
}

function addTimeline() {
  draft.value.story.timeline.push({ year: '', icon: '✦', title: '', text: '' })
}

function addPerson(list: Person[], role = '') {
  list.push({ name: '', role })
}

function addMemory() {
  draft.value.memories.unshift({
    quote: '',
    name: '',
    relation: 'Son',
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
  })
}

function addQuote() {
  draft.value.quotes.push({ text: '', theme: '' })
}

function addVideo() {
  draft.value.videos.push({ title: '', date: '', tone: '#6f8f72' })
}

function addValue() {
  draft.value.legacy.values.push({ icon: '✦', title: '', text: '' })
}

function removeAt<T>(list: T[], index: number) {
  list.splice(index, 1)
}

async function uploadPhoto(event: Event, photo?: GalleryPhoto) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  uploading.value = true
  saveError.value = ''
  try {
    const body = new FormData()
    body.append('file', file)
    const result = await $fetch<{ src: string }>('/api/admin/upload', { method: 'POST', body })
    if (photo) {
      photo.src = result.src
    } else {
      const nextId = Math.max(0, ...draft.value.gallery.map((item) => item.id)) + 1
      draft.value.gallery.push({
        id: nextId,
        title: file.name.replace(/\.[^.]+$/, ''),
        category: 'Family',
        src: result.src,
      })
    }
  } catch (error: unknown) {
    const err = error as { data?: { statusMessage?: string }; statusMessage?: string }
    saveError.value = err.data?.statusMessage || err.statusMessage || 'Could not upload photo.'
  } finally {
    uploading.value = false
    input.value = ''
  }
}

onMounted(loadSession)
</script>

<template>
  <div class="admin">
    <header class="top">
      <NuxtLink to="/" class="brand">✦ Family admin</NuxtLink>
      <div v-if="session.authenticated" class="top-actions">
        <button class="ghost" type="button" @click="logout">Log out</button>
        <button class="btn" type="button" :disabled="saving" @click="save">
          {{ saving ? 'Saving…' : 'Save changes' }}
        </button>
      </div>
    </header>

    <main class="wrap">
      <section v-if="!session.authenticated" class="login card">
        <p class="eyebrow">Private</p>
        <h1>Edit Dad’s story</h1>
        <p class="lede">
          Use this page to add the things only family would know — names, dates, memories, and photos.
          After you save, they appear on the public memorial.
        </p>

        <p v-if="!session.configured" class="alert">
          Ask the site owner to set <strong>ADMIN_PASSWORD</strong> in Netlify before this login will work.
        </p>

        <form v-else class="form" @submit.prevent="login">
          <label>
            Family password
            <input v-model="password" type="password" required autocomplete="current-password" />
          </label>
          <p v-if="loginError" class="alert">{{ loginError }}</p>
          <button class="btn" type="submit">Enter</button>
        </form>
      </section>

      <template v-else>
        <p class="hint">
          Add what you remember. Empty placeholders can be rewritten. Save when you are done —
          your brother can log in with the same password.
        </p>
        <p v-if="savedAt" class="ok">Saved at {{ savedAt }}</p>
        <p v-if="saveError" class="alert">{{ saveError }}</p>
        <p v-if="uploading" class="ok">Uploading photo…</p>

        <nav class="tabs" aria-label="Edit sections">
          <button
            v-for="item in sections"
            :key="item.id"
            type="button"
            :class="{ active: section === item.id }"
            @click="section = item.id"
          >
            {{ item.label }}
          </button>
        </nav>

        <section v-show="section === 'about'" class="card">
          <h2>About him</h2>
          <div class="grid">
            <label>Full name<input v-model="draft.person.fullName" /></label>
            <label>How we called him<input v-model="draft.person.displayName" /></label>
            <label>Years shown on home<input v-model="draft.person.yearsLabel" placeholder="1958 — 2024" /></label>
            <label>Portrait caption<input v-model="draft.person.caption" /></label>
            <label>Born<input v-model="draft.person.birthDate" type="date" /></label>
            <label>Passed away<input v-model="draft.person.deathDate" type="date" /></label>
            <label>Laid to rest<input v-model="draft.person.burialDate" type="date" /></label>
          </div>
          <label>Home tagline<input v-model="draft.person.tagline" /></label>
          <label>Home quote<textarea v-model="draft.person.homeQuote" rows="3" /></label>
        </section>

        <section v-show="section === 'story'" class="card">
          <h2>His story</h2>
          <label>Intro<textarea v-model="draft.story.lede" rows="2" /></label>
          <article v-for="(item, i) in draft.story.timeline" :key="i" class="item">
            <div class="grid three">
              <label>Year / season<input v-model="item.year" /></label>
              <label>Title<input v-model="item.title" /></label>
              <label>Icon<input v-model="item.icon" /></label>
            </div>
            <label>What happened<textarea v-model="item.text" rows="3" /></label>
            <button class="ghost danger" type="button" @click="removeAt(draft.story.timeline, i)">Remove</button>
          </article>
          <button class="ghost" type="button" @click="addTimeline">+ Add a life event</button>
        </section>

        <section v-show="section === 'family'" class="card">
          <h2>Family tree</h2>
          <div class="grid">
            <label>His name on the tree<input v-model="draft.family.center.name" /></label>
            <label>Years<input v-model="draft.family.center.years" /></label>
            <label>Married line<input v-model="draft.family.center.married" /></label>
            <label>Wife’s name<input v-model="draft.family.wife.name" /></label>
            <label>Wife’s title<input v-model="draft.family.wife.role" /></label>
          </div>

          <h3>Parents</h3>
          <article v-for="(person, i) in draft.family.grandparents" :key="`g-${i}`" class="item">
            <div class="grid">
              <label>Name<input v-model="person.name" /></label>
              <label>Relation<input v-model="person.role" /></label>
            </div>
            <button class="ghost danger" type="button" @click="removeAt(draft.family.grandparents, i)">Remove</button>
          </article>
          <button class="ghost" type="button" @click="addPerson(draft.family.grandparents, 'Parent')">+ Add parent</button>

          <h3>Children</h3>
          <article v-for="(person, i) in draft.family.children" :key="`c-${i}`" class="item">
            <div class="grid">
              <label>Name<input v-model="person.name" /></label>
              <label>Relation<input v-model="person.role" /></label>
            </div>
            <button class="ghost danger" type="button" @click="removeAt(draft.family.children, i)">Remove</button>
          </article>
          <button class="ghost" type="button" @click="addPerson(draft.family.children, 'Son')">+ Add child</button>

          <h3>Grandchildren</h3>
          <article v-for="(person, i) in draft.family.grandchildren" :key="`gc-${i}`" class="item">
            <div class="grid">
              <label>Name<input v-model="person.name" /></label>
              <label>Relation<input v-model="person.role" /></label>
            </div>
            <button class="ghost danger" type="button" @click="removeAt(draft.family.grandchildren, i)">Remove</button>
          </article>
          <button class="ghost" type="button" @click="addPerson(draft.family.grandchildren, 'Grandchild')">+ Add grandchild</button>
        </section>

        <section v-show="section === 'memories'" class="card">
          <h2>Memories</h2>
          <button class="ghost" type="button" @click="addMemory">+ Add a memory</button>
          <article v-for="(memory, i) in draft.memories" :key="i" class="item">
            <label>Memory<textarea v-model="memory.quote" rows="3" /></label>
            <div class="grid three">
              <label>Name<input v-model="memory.name" /></label>
              <label>
                Relationship
                <select v-model="memory.relation">
                  <option v-for="option in relationOptions" :key="option" :value="option">{{ option }}</option>
                </select>
              </label>
              <label>Date written<input v-model="memory.date" /></label>
            </div>
            <button class="ghost danger" type="button" @click="removeAt(draft.memories, i)">Remove</button>
          </article>
        </section>

        <section v-show="section === 'quotes'" class="card">
          <h2>Quotes & lessons</h2>
          <article v-for="(quote, i) in draft.quotes" :key="i" class="item">
            <label>Quote<textarea v-model="quote.text" rows="2" /></label>
            <label>Theme<input v-model="quote.theme" placeholder="On faith" /></label>
            <button class="ghost danger" type="button" @click="removeAt(draft.quotes, i)">Remove</button>
          </article>
          <button class="ghost" type="button" @click="addQuote">+ Add a quote</button>
        </section>

        <section v-show="section === 'gallery'" class="card">
          <h2>Photos</h2>
          <label class="upload">
            Add a new photo
            <input type="file" accept="image/*" @change="uploadPhoto($event)" />
          </label>
          <article v-for="(photo, i) in draft.gallery" :key="photo.id" class="item photo">
            <img :src="photo.src" :alt="photo.title" />
            <div>
              <label>Caption<input v-model="photo.title" /></label>
              <label>
                Album
                <select v-model="photo.category">
                  <option v-for="filter in galleryFilters.filter((f) => f !== 'All')" :key="filter" :value="filter">
                    {{ filter }}
                  </option>
                </select>
              </label>
              <label class="upload">
                Replace photo
                <input type="file" accept="image/*" @change="uploadPhoto($event, photo)" />
              </label>
              <button class="ghost danger" type="button" @click="removeAt(draft.gallery, i)">Remove</button>
            </div>
          </article>
        </section>

        <section v-show="section === 'videos'" class="card">
          <h2>Videos</h2>
          <article v-for="(video, i) in draft.videos" :key="i" class="item">
            <div class="grid">
              <label>Title<input v-model="video.title" /></label>
              <label>Date<input v-model="video.date" /></label>
            </div>
            <button class="ghost danger" type="button" @click="removeAt(draft.videos, i)">Remove</button>
          </article>
          <button class="ghost" type="button" @click="addVideo">+ Add a video title</button>
        </section>

        <section v-show="section === 'legacy'" class="card">
          <h2>Legacy & resting place</h2>
          <article v-for="(value, i) in draft.legacy.values" :key="i" class="item">
            <div class="grid three">
              <label>Icon<input v-model="value.icon" /></label>
              <label>Title<input v-model="value.title" /></label>
            </div>
            <label>Description<textarea v-model="value.text" rows="2" /></label>
            <button class="ghost danger" type="button" @click="removeAt(draft.legacy.values, i)">Remove</button>
          </article>
          <button class="ghost" type="button" @click="addValue">+ Add a value</button>

          <h3>Headstone</h3>
          <label>Heading<input v-model="draft.legacy.resting.heading" /></label>
          <label>Epitaph<input v-model="draft.legacy.resting.epitaph" /></label>
          <label>Note<textarea v-model="draft.legacy.resting.note" rows="4" /></label>
          <label>Scripture<textarea v-model="draft.legacy.resting.verse" rows="2" /></label>
          <label>Anniversary message<textarea v-model="draft.anniversary.farewell" rows="3" /></label>
          <label>Sign-off<input v-model="draft.anniversary.signOff" /></label>
        </section>
      </template>
    </main>
  </div>
</template>

<style scoped>
.admin {
  min-height: 100vh;
  background: var(--background);
  color: var(--foreground);
}

.top {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.25rem;
  background: color-mix(in oklch, var(--background) 88%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.brand {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  color: var(--forest);
}

.top-actions,
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.wrap {
  width: min(900px, calc(100% - 2rem));
  margin: 1.5rem auto 4rem;
}

.card {
  padding: 1.4rem;
  border: 1px solid var(--border);
  border-radius: 1.1rem;
  background: color-mix(in oklch, var(--card) 92%, transparent);
  display: grid;
  gap: 0.85rem;
}

.login h1,
.card h2 {
  font-size: 1.8rem;
  color: var(--forest);
  margin: 0;
}

h3 {
  margin: 0.5rem 0 0;
  font-size: 1.2rem;
  color: var(--forest);
}

.lede,
.hint {
  color: var(--muted-foreground);
}

.form,
.grid {
  display: grid;
  gap: 0.75rem;
}

@media (min-width: 700px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }

  .grid.three {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

label {
  display: grid;
  gap: 0.35rem;
  font-size: 0.82rem;
  color: var(--muted-foreground);
  text-align: left;
}

input,
textarea,
select {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 0.75rem 0.85rem;
  background: var(--background);
  color: var(--foreground);
  font: inherit;
}

.item {
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 0.9rem;
  display: grid;
  gap: 0.7rem;
}

.photo {
  grid-template-columns: 120px 1fr;
  align-items: start;
}

.photo img {
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: 0.7rem;
}

.tabs button,
.ghost {
  border: 1px solid var(--border);
  background: transparent;
  border-radius: 999px;
  padding: 0.45rem 0.85rem;
  color: var(--forest);
}

.tabs button.active,
.ghost:hover {
  background: var(--forest);
  color: var(--primary-foreground);
  border-color: transparent;
}

.danger {
  justify-self: start;
  color: #8a3b32;
}

.alert {
  color: #8a3b32;
  background: color-mix(in oklch, #8a3b32 10%, white);
  padding: 0.7rem 0.85rem;
  border-radius: 0.7rem;
}

.ok {
  color: var(--forest);
}

.upload input {
  padding: 0.45rem;
}

.btn:disabled {
  opacity: 0.6;
}
</style>
