<script setup lang="ts">
import type { GalleryPhoto } from '~/types/content'

const { content } = useMemorialContent()

useSeoMeta({ title: 'Photo Gallery — In Loving Memory' })

const active = ref('All')
const selected = ref<GalleryPhoto | null>(null)

const filters = computed(() => {
  const cats = [...new Set(content.value.gallery.map((photo) => photo.category))]
  return ['All', ...cats]
})

const filtered = computed(() =>
  active.value === 'All'
    ? content.value.gallery
    : content.value.gallery.filter((p) => p.category === active.value),
)

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') selected.value = null
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="page">
    <div class="container">
      <PageHero
        eyebrow="Moments"
        title="Photo Gallery"
        lede="Every picture, a small window into a beautiful life."
      />

      <div class="filters fade-up-delay" role="tablist" aria-label="Gallery filters">
        <button
          v-for="filter in filters"
          :key="filter"
          type="button"
          class="chip"
          :class="{ active: active === filter }"
          role="tab"
          :aria-selected="active === filter"
          @click="active = filter"
        >
          {{ filter }}
        </button>
      </div>

      <div class="grid">
        <button
          v-for="(photo, i) in filtered"
          :key="photo.id"
          type="button"
          class="tile fade-up"
          :style="{ animationDelay: `${i * 0.04}s` }"
          :aria-label="photo.title"
          @click="selected = photo"
        >
          <img :src="photo.src" :alt="photo.title" loading="lazy" />
          <span class="veil" aria-hidden="true" />
          <span class="label">{{ photo.title }}</span>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="selected"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="selected.title"
        @click.self="selected = null"
      >
        <button type="button" class="close" aria-label="Close" @click="selected = null">✕</button>
        <img :src="selected.src" :alt="selected.title" class="frame" />
        <p>{{ selected.title }}</p>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.55rem;
  margin-bottom: 2rem;
}

.chip {
  padding: 0.55rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: color-mix(in oklch, var(--card) 80%, transparent);
  color: var(--forest);
  font-size: 0.82rem;
  font-weight: 500;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.dark .chip {
  color: var(--foreground);
}

.chip.active {
  background: var(--forest);
  color: var(--primary-foreground);
  border-color: transparent;
}

.dark .chip.active {
  background: var(--primary);
  color: var(--primary-foreground);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

.tile {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: 1.25rem;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  text-align: left;
  box-shadow: inset 0 0 0 1px color-mix(in oklch, white 18%, transparent);
  transition: transform 0.3s var(--ease-out), box-shadow 0.3s ease;
}

.tile img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 45%,
    color-mix(in oklch, black 55%, transparent) 100%
  );
  pointer-events: none;
}

.tile:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow:
    inset 0 0 0 1px color-mix(in oklch, white 22%, transparent),
    0 18px 40px color-mix(in oklch, var(--forest) 18%, transparent);
}

.label {
  position: relative;
  z-index: 1;
  color: white;
  font-family: var(--font-serif);
  font-size: 1.05rem;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.35);
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: color-mix(in oklch, black 55%, transparent);
  backdrop-filter: blur(8px);
  display: grid;
  place-items: center;
  align-content: center;
  gap: 1rem;
  padding: 2rem;
}

.frame {
  width: min(720px, 92vw);
  max-height: 78vh;
  object-fit: contain;
  border-radius: 1rem;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
  background: color-mix(in oklch, black 20%, transparent);
}

.lightbox p {
  color: white;
  font-family: var(--font-serif);
  font-size: 1.25rem;
  text-align: center;
}

.close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  background: color-mix(in oklch, white 15%, transparent);
  color: white;
}
</style>
