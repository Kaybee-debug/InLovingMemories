<script setup lang="ts">
import { videos } from '~/data/memorial'

useSeoMeta({ title: 'Videos — In Loving Memory' })
</script>

<template>
  <div class="page">
    <div class="container">
      <PageHero
        eyebrow="In Motion"
        title="Family Videos"
        lede="Living moments — his voice, his laughter, his light."
      />

      <div class="grid">
        <article
          v-for="(video, i) in videos"
          :key="video.title"
          class="video fade-up"
          :style="{
            animationDelay: `${i * 0.05}s`,
            '--tone': video.tone,
          }"
        >
          <div class="thumb">
            <span class="play" aria-hidden="true">▶</span>
          </div>
          <div class="meta">
            <h3>{{ video.title }}</h3>
            <p>{{ video.date }}</p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.15rem;
}

.video {
  border-radius: 1.2rem;
  overflow: hidden;
  border: 1px solid var(--border);
  background: color-mix(in oklch, var(--card) 92%, transparent);
  transition: transform 0.3s var(--ease-out), box-shadow 0.3s ease;
}

.video:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 40px color-mix(in oklch, var(--forest) 14%, transparent);
}

.thumb {
  aspect-ratio: 16 / 10;
  background:
    radial-gradient(circle at 50% 45%, color-mix(in oklch, white 18%, transparent), transparent 40%),
    linear-gradient(145deg, var(--tone), color-mix(in srgb, var(--tone) 60%, #243028));
  display: grid;
  place-items: center;
}

.play {
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: color-mix(in oklch, white 22%, transparent);
  color: white;
  font-size: 0.9rem;
  backdrop-filter: blur(4px);
  border: 1px solid color-mix(in oklch, white 35%, transparent);
}

.meta {
  padding: 1rem 1.1rem 1.15rem;
}

.meta h3 {
  font-size: 1.2rem;
  color: var(--forest);
  margin-bottom: 0.25rem;
}

.dark .meta h3 {
  color: var(--foreground);
}

.meta p {
  font-size: 0.85rem;
  color: var(--muted-foreground);
}
</style>
