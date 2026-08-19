<script setup lang="ts">
const { content } = useMemorialContent()

useSeoMeta({ title: 'Quotes & Lessons — In Loving Memory' })

const index = ref(0)
const quotes = computed(() => content.value.quotes)
const featured = computed(() => quotes.value[index.value] || quotes.value[0])

function next() {
  if (!quotes.value.length) return
  index.value = (index.value + 1) % quotes.value.length
}

onMounted(() => {
  if (!quotes.value.length) return
  const day = Math.floor(Date.now() / 86400000)
  index.value = day % quotes.value.length
})
</script>

<template>
  <div class="page">
    <div class="container">
      <PageHero
        eyebrow="His Voice"
        title="Quotes & Lessons"
        lede="Words we carry with us, always."
      />

      <section class="today fade-up-delay">
        <p class="eyebrow">Today's Reflection</p>
        <blockquote v-if="featured">"{{ featured.text }}"</blockquote>
        <p v-if="featured" class="theme">{{ featured.theme }}</p>
        <button class="btn btn-ghost" type="button" @click="next">Another reflection</button>
      </section>

      <section class="all">
        <h2>Everything he taught us</h2>
        <div class="grid">
          <article v-for="(quote, i) in quotes" :key="`${quote.theme}-${i}`" class="card fade-up" :style="{ animationDelay: `${i * 0.04}s` }">
            <span class="mark" aria-hidden="true">"</span>
            <p>{{ quote.text }}</p>
            <footer>— {{ quote.theme }}</footer>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.today {
  max-width: 640px;
  margin: 0 auto 3.5rem;
  text-align: center;
  padding: 2.25rem 1.5rem;
  border-radius: 1.4rem;
  border: 1px solid color-mix(in oklch, var(--gold) 40%, var(--border));
  background:
    radial-gradient(ellipse at 50% 0%, color-mix(in oklch, var(--gold) 16%, transparent), transparent 60%),
    color-mix(in oklch, var(--card) 92%, transparent);
}

.today blockquote {
  margin: 1rem 0 0.75rem;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(1.5rem, 3.5vw, 2.1rem);
  line-height: 1.3;
  color: var(--forest);
}

.dark .today blockquote {
  color: var(--foreground);
}

.theme {
  color: var(--muted-foreground);
  margin-bottom: 1.25rem;
  font-size: 0.9rem;
}

.all h2 {
  text-align: center;
  font-size: 1.8rem;
  color: var(--forest);
  margin-bottom: 1.5rem;
}

.dark .all h2 {
  color: var(--foreground);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

.card {
  padding: 1.35rem;
  border-radius: 1.1rem;
  border: 1px solid var(--border);
  background: color-mix(in oklch, var(--card) 90%, transparent);
  display: grid;
  gap: 0.65rem;
}

.mark {
  color: var(--gold);
  font-family: var(--font-serif);
  font-size: 2rem;
  line-height: 0.7;
}

.card p {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  line-height: 1.35;
  color: var(--forest);
}

.dark .card p {
  color: var(--foreground);
}

.card footer {
  font-size: 0.82rem;
  color: var(--muted-foreground);
}
</style>
