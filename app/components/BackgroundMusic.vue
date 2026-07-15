<script setup lang="ts">
const { isPlaying, SRC, toggle, bind } = useBackgroundMusic()
const media = ref<HTMLVideoElement | null>(null)

onMounted(() => {
  if (media.value) bind(media.value)
})
</script>

<template>
  <div class="music">
    <video
      id="bg-music"
      ref="media"
      :src="SRC"
      preload="auto"
      playsinline
      loop
      hidden
      aria-hidden="true"
    />
    <button
      class="music-btn"
      type="button"
      :aria-pressed="isPlaying"
      :aria-label="isPlaying ? 'Pause background music' : 'Play background music'"
      @click="toggle"
    >
      <span class="icon" aria-hidden="true">{{ isPlaying ? '♪' : '♫' }}</span>
      <span class="label">{{ isPlaying ? 'Pause music' : 'Play music' }}</span>
    </button>
  </div>
</template>

<style scoped>
.music {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 60;
}

.music-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: color-mix(in oklch, var(--background) 88%, transparent);
  backdrop-filter: blur(12px);
  color: var(--forest);
  box-shadow: 0 10px 30px color-mix(in oklch, var(--forest) 14%, transparent);
  transition: transform 0.25s var(--ease-out), background 0.2s ease;
}

.dark .music-btn {
  color: var(--foreground);
}

.music-btn:hover {
  transform: translateY(-2px);
  background: var(--secondary);
}

.icon {
  color: var(--gold);
  font-size: 1rem;
}

.label {
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.02em;
}

@media (max-width: 520px) {
  .label {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }

  .music-btn {
    width: 2.75rem;
    height: 2.75rem;
    justify-content: center;
    padding: 0;
  }
}
</style>
