<script setup lang="ts">
useSeoMeta({ title: 'Letters — In Loving Memory' })

const letter = ref('')
const sealed = ref(false)
const sealedLetters = ref<{ text: string; at: string }[]>([])

function seal() {
  if (!letter.value.trim()) return
  sealedLetters.value.unshift({
    text: letter.value.trim(),
    at: new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
  })
  letter.value = ''
  sealed.value = true
  setTimeout(() => {
    sealed.value = false
  }, 2200)
}
</script>

<template>
  <div class="page">
    <div class="container">
      <PageHero
        eyebrow="Dear Papa"
        title="Letters"
        lede="Whenever you miss him — write. He is listening."
      />

      <section class="paper fade-up-delay">
        <p class="salutation">Dear Papa,</p>
        <textarea
          v-model="letter"
          rows="10"
          placeholder="Write what your heart needs to say..."
        />
        <p class="closing">— Love, always</p>
        <button class="btn" type="button" @click="seal">
          {{ sealed ? 'Sealed with love ✦' : 'Seal this letter' }}
        </button>
      </section>

      <section v-if="sealedLetters.length" class="sealed">
        <article v-for="(item, i) in sealedLetters" :key="i" class="letter-card">
          <p class="date">{{ item.at }}</p>
          <p class="body">{{ item.text }}</p>
        </article>
      </section>
    </div>
  </div>
</template>

<style scoped>
.paper {
  max-width: 640px;
  margin: 0 auto;
  padding: 2rem 1.5rem 1.75rem;
  border-radius: 1.25rem;
  border: 1px solid var(--border);
  background:
    linear-gradient(180deg, color-mix(in oklch, var(--gold) 6%, transparent), transparent 30%),
    color-mix(in oklch, var(--card) 95%, transparent);
  box-shadow: 0 18px 50px color-mix(in oklch, var(--forest) 8%, transparent);
  text-align: center;
}

.salutation,
.closing {
  font-family: var(--font-script);
  font-size: 1.6rem;
  color: var(--forest);
}

.dark .salutation,
.dark .closing {
  color: var(--gold);
}

.salutation {
  text-align: left;
  margin-bottom: 0.75rem;
}

.closing {
  text-align: right;
  margin: 0.75rem 0 1.25rem;
}

textarea {
  width: 100%;
  border: none;
  border-bottom: 1px dashed color-mix(in oklch, var(--gold) 45%, var(--border));
  background: transparent;
  color: var(--foreground);
  font-family: var(--font-serif);
  font-size: 1.2rem;
  line-height: 1.7;
  resize: vertical;
  outline: none;
  padding: 0.5rem 0;
}

.sealed {
  max-width: 640px;
  margin: 2rem auto 0;
  display: grid;
  gap: 0.85rem;
}

.letter-card {
  padding: 1.25rem 1.35rem;
  border-radius: 1rem;
  border: 1px solid var(--border);
  background: color-mix(in oklch, var(--card) 90%, transparent);
}

.date {
  font-size: 0.78rem;
  color: var(--gold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.body {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  white-space: pre-wrap;
  color: var(--forest);
}

.dark .body {
  color: var(--foreground);
}
</style>
