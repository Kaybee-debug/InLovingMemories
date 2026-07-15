<script setup lang="ts">
import { storyTimeline } from '~/data/memorial'

useSeoMeta({ title: 'His Story — In Loving Memory' })
</script>

<template>
  <div class="page">
    <div class="container">
      <PageHero
        eyebrow="A Life Well Lived"
        title="His Story"
        lede="From a curious boy by the river to the man who taught us everything about love."
      />

      <ol class="timeline">
        <li
          v-for="(item, i) in storyTimeline"
          :key="item.year"
          class="item fade-up"
          :style="{ animationDelay: `${i * 0.06}s` }"
        >
          <div class="marker">
            <span class="icon" aria-hidden="true">{{ item.icon }}</span>
            <span class="year">{{ item.year }}</span>
          </div>
          <article class="card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.35rem;
  position: relative;
  max-width: 720px;
  margin-inline: auto;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 1.15rem;
  top: 0.5rem;
  bottom: 0.5rem;
  width: 1px;
  background: linear-gradient(
    180deg,
    color-mix(in oklch, var(--gold) 70%, transparent),
    color-mix(in oklch, var(--forest) 20%, transparent)
  );
}

.item {
  display: grid;
  grid-template-columns: 2.4rem 1fr;
  gap: 1rem;
  align-items: start;
}

.marker {
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  gap: 0.35rem;
  padding-top: 0.35rem;
}

.icon {
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: var(--background);
  border: 1px solid color-mix(in oklch, var(--gold) 55%, var(--border));
  color: var(--gold);
  font-size: 0.85rem;
}

.year {
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  color: var(--muted-foreground);
  writing-mode: horizontal-tb;
}

.card {
  padding: 1.35rem 1.4rem;
  border-radius: 1.1rem;
  background: color-mix(in oklch, var(--card) 92%, transparent);
  border: 1px solid var(--border);
  backdrop-filter: blur(8px);
}

.card h3 {
  font-size: 1.45rem;
  color: var(--forest);
  margin-bottom: 0.45rem;
}

.dark .card h3 {
  color: var(--foreground);
}

.card p {
  color: var(--muted-foreground);
  font-size: 0.98rem;
}

@media (min-width: 720px) {
  .item {
    grid-template-columns: 5.5rem 1fr;
  }

  .timeline::before {
    left: 2.5rem;
  }

  .year {
    font-size: 0.75rem;
    letter-spacing: 0.12em;
  }
}
</style>
