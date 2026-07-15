<script setup lang="ts">
import { legacyValues } from '~/data/memorial'

useSeoMeta({ title: 'His Legacy — In Loving Memory' })

const contribution = ref('')
const contributions = ref<string[]>([])

function add() {
  if (!contribution.value.trim()) return
  contributions.value.unshift(contribution.value.trim())
  contribution.value = ''
}
</script>

<template>
  <div class="page">
    <div class="container">
      <PageHero
        eyebrow="What He Leaves Behind"
        title="His Legacy"
        lede="Not in things, but in the way we love each other now."
      />

      <div class="values">
        <article
          v-for="(value, i) in legacyValues"
          :key="value.title"
          class="value fade-up"
          :style="{ animationDelay: `${i * 0.05}s` }"
        >
          <span aria-hidden="true">{{ value.icon }}</span>
          <h3>{{ value.title }}</h3>
          <p>{{ value.text }}</p>
        </article>
      </div>

      <section class="gift fade-up-delay-2">
        <p class="eyebrow">The lasting gift</p>
        <blockquote>
          "You will not be remembered for what you had, but for who you helped become."
        </blockquote>
        <p class="note">
          Every child he raised, every friend he steadied, every grandchild who now says
          "because Papa said so" — that is his legacy. And it grows a little every day.
        </p>

        <form class="form" @submit.prevent="add">
          <input
            v-model="contribution"
            placeholder="How does his legacy live in you?"
          />
          <button class="btn" type="submit">Add to his legacy</button>
        </form>

        <ul v-if="contributions.length" class="added">
          <li v-for="(item, i) in contributions" :key="i">{{ item }}</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.values {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  margin-bottom: 3rem;
}

.value {
  padding: 1.4rem 1.25rem;
  border-radius: 1.15rem;
  border: 1px solid var(--border);
  background: color-mix(in oklch, var(--card) 90%, transparent);
  text-align: center;
}

.value span {
  display: inline-block;
  color: var(--gold);
  margin-bottom: 0.65rem;
  font-size: 1.1rem;
}

.value h3 {
  font-size: 1.3rem;
  color: var(--forest);
  margin-bottom: 0.45rem;
}

.dark .value h3 {
  color: var(--foreground);
}

.value p {
  color: var(--muted-foreground);
  font-size: 0.95rem;
}

.gift {
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
  padding: 2rem 1.25rem;
  border-radius: 1.4rem;
  border: 1px solid color-mix(in oklch, var(--gold) 35%, var(--border));
  background:
    radial-gradient(ellipse at 50% 0%, color-mix(in oklch, var(--gold) 14%, transparent), transparent 55%),
    color-mix(in oklch, var(--card) 92%, transparent);
}

.gift blockquote {
  margin: 1rem 0;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(1.35rem, 3vw, 1.85rem);
  line-height: 1.35;
  color: var(--forest);
}

.dark .gift blockquote {
  color: var(--foreground);
}

.note {
  color: var(--muted-foreground);
  margin-bottom: 1.5rem;
  line-height: 1.55;
}

.form {
  display: grid;
  gap: 0.75rem;
  justify-items: center;
}

input {
  width: min(100%, 420px);
  border: 1px solid var(--border);
  background: color-mix(in oklch, var(--background) 80%, transparent);
  color: var(--foreground);
  border-radius: 999px;
  padding: 0.85rem 1.15rem;
  outline: none;
  font: inherit;
}

input:focus {
  border-color: color-mix(in oklch, var(--gold) 60%, var(--border));
}

.added {
  list-style: none;
  margin: 1.25rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.55rem;
}

.added li {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--forest);
  padding: 0.75rem 1rem;
  border-radius: 0.85rem;
  background: color-mix(in oklch, var(--secondary) 80%, transparent);
}

.dark .added li {
  color: var(--foreground);
}
</style>
