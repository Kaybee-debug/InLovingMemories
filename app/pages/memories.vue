<script setup lang="ts">
import { relationOptions } from '~/data/memorial'

const { content, refresh } = useMemorialContent()

useSeoMeta({ title: 'Memories — In Loving Memory' })

function todayInputValue() {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function formatDisplayDate(value: string) {
  const parsed = new Date(`${value}T12:00:00`)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const form = reactive({
  quote: '',
  name: '',
  relation: '',
  date: todayInputValue(),
})
const submitting = ref(false)
const submitError = ref('')

async function addMemory() {
  if (!form.quote.trim() || !form.name.trim() || !form.relation || !form.date) return
  submitting.value = true
  submitError.value = ''
  try {
    await $fetch('/api/memories', {
      method: 'POST',
      body: {
        quote: form.quote.trim(),
        name: form.name.trim(),
        relation: form.relation,
        date: formatDisplayDate(form.date),
      },
    })
    form.quote = ''
    form.name = ''
    form.relation = ''
    form.date = todayInputValue()
    await refresh()
  } catch {
    submitError.value = 'Could not save this memory. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="page">
    <div class="container">
      <PageHero
        eyebrow="Shared Hearts"
        title="Memories"
        lede="Every story keeps him a little closer."
      />

      <section class="share fade-up-delay">
        <h2>Share a memory</h2>
        <p>Your words become part of his story.</p>
        <form class="form" @submit.prevent="addMemory">
          <textarea
            v-model="form.quote"
            rows="4"
            required
            placeholder="What do you remember most?"
          />
          <div class="row">
            <input v-model="form.name" required placeholder="Your name" />
            <select v-model="form.relation" required>
              <option disabled value="">Select relationship</option>
              <option v-for="option in relationOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
          <label class="date-field">
            <span>Date written</span>
            <input v-model="form.date" type="date" required />
          </label>
          <p v-if="submitError" class="error">{{ submitError }}</p>
          <button class="btn" type="submit" :disabled="submitting">
            {{ submitting ? 'Saving…' : 'Add memory' }}
          </button>
        </form>
      </section>

      <div class="list">
        <article
          v-for="(memory, i) in content.memories"
          :key="`${memory.name}-${memory.date}-${i}`"
          class="memory fade-up"
          :style="{ animationDelay: `${i * 0.05}s` }"
        >
          <span class="mark" aria-hidden="true">"</span>
          <p class="quote">{{ memory.quote }}</p>
          <div class="meta">
            <strong>{{ memory.name }}</strong>
            <span>{{ memory.relation }}</span>
            <time>{{ memory.date }}</time>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.share {
  max-width: 640px;
  margin: 0 auto 2.5rem;
  padding: 1.75rem;
  border-radius: 1.25rem;
  border: 1px solid var(--border);
  background: color-mix(in oklch, var(--card) 90%, transparent);
  text-align: center;
}

.share h2 {
  font-size: 1.7rem;
  color: var(--forest);
  margin-bottom: 0.35rem;
}

.dark .share h2 {
  color: var(--foreground);
}

.share > p {
  color: var(--muted-foreground);
  margin-bottom: 1.25rem;
  font-family: var(--font-serif);
  font-style: italic;
}

.form {
  display: grid;
  gap: 0.75rem;
}

.row {
  display: grid;
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .row {
    grid-template-columns: 1fr 1fr;
  }
}

.date-field {
  display: grid;
  gap: 0.4rem;
  text-align: left;
}

.date-field span {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--muted-foreground);
  letter-spacing: 0.04em;
}

textarea,
input,
select {
  width: 100%;
  border: 1px solid var(--border);
  background: color-mix(in oklch, var(--background) 80%, transparent);
  color: var(--foreground);
  border-radius: 0.85rem;
  padding: 0.85rem 1rem;
  outline: none;
  font: inherit;
}

select {
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, var(--muted-foreground) 50%),
    linear-gradient(135deg, var(--muted-foreground) 50%, transparent 50%);
  background-position:
    calc(100% - 1.15rem) calc(50% - 0.15rem),
    calc(100% - 0.75rem) calc(50% - 0.15rem);
  background-size: 0.4rem 0.4rem, 0.4rem 0.4rem;
  background-repeat: no-repeat;
  padding-right: 2.4rem;
  cursor: pointer;
}

textarea:focus,
input:focus,
select:focus {
  border-color: color-mix(in oklch, var(--gold) 60%, var(--border));
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--gold) 18%, transparent);
}

.error {
  color: #8a3b32;
  margin: 0;
}

.list {
  display: grid;
  gap: 1rem;
  max-width: 720px;
  margin: 0 auto;
}

.memory {
  padding: 1.5rem 1.5rem 1.35rem;
  border-radius: 1.2rem;
  border: 1px solid var(--border);
  background: color-mix(in oklch, var(--card) 92%, transparent);
}

.mark {
  font-family: var(--font-serif);
  font-size: 2.5rem;
  line-height: 0.8;
  color: var(--gold);
}

.quote {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  line-height: 1.4;
  color: var(--forest);
  margin: 0.35rem 0 1rem;
}

.dark .quote {
  color: var(--foreground);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem 1rem;
  font-size: 0.85rem;
  color: var(--muted-foreground);
}

.meta strong {
  color: var(--forest);
  font-weight: 600;
}

.dark .meta strong {
  color: var(--gold);
}
</style>
