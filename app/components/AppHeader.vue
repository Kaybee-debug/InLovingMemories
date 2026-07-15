<script setup lang="ts">
import { navLinks } from '~/data/memorial'

const route = useRoute()
const open = ref(false)
const { isDark, toggle } = useTheme()

watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <header class="header" :class="{ open }">
    <div class="bar">
      <NuxtLink to="/" class="brand">
        <span class="star" aria-hidden="true">✦</span>
        <span>In Loving Memory</span>
      </NuxtLink>

      <nav class="desktop-nav" aria-label="Primary">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          :class="{ active: route.path === link.to }"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="actions">
        <button
          class="icon-btn"
          type="button"
          :aria-label="isDark ? 'Switch to light theme' : 'Toggle theme'"
          @click="toggle"
        >
          <span v-if="isDark" aria-hidden="true">☾</span>
          <span v-else aria-hidden="true">☀</span>
        </button>
        <button
          class="icon-btn menu-btn"
          type="button"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          aria-label="Menu"
          @click="open = !open"
        >
          <span aria-hidden="true">{{ open ? '✕' : '☰' }}</span>
        </button>
      </div>
    </div>

    <Transition name="menu">
      <nav
        v-if="open"
        id="mobile-nav"
        class="mobile-nav"
        aria-label="Mobile"
      >
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="mobile-link"
          :class="{ active: route.path === link.to }"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  backdrop-filter: blur(14px);
  background: color-mix(in oklch, var(--background) 78%, transparent);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease, background 0.3s ease;
}

.header.open {
  border-bottom-color: var(--border);
  background: color-mix(in oklch, var(--background) 94%, transparent);
}

.bar {
  width: min(1200px, calc(100% - 1.75rem));
  margin: 0 auto;
  min-height: var(--header-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--font-serif);
  font-size: 1.15rem;
  font-weight: 500;
  color: var(--forest);
  white-space: nowrap;
}

.dark .brand {
  color: var(--foreground);
}

.star {
  color: var(--forest);
  font-size: 0.85rem;
}

.dark .star {
  color: var(--gold);
}

.desktop-nav {
  display: none;
  align-items: center;
  gap: 0.15rem;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-link {
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  padding: 0.4rem 0.55rem;
  color: var(--muted-foreground);
  border-radius: 999px;
  transition: color 0.2s ease, background 0.2s ease;
}

.nav-link:hover,
.nav-link.active {
  color: var(--forest);
}

.dark .nav-link:hover,
.dark .nav-link.active {
  color: var(--gold);
}

.nav-link.active {
  background: color-mix(in oklch, var(--forest) 8%, transparent);
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.icon-btn {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  display: grid;
  place-items: center;
  color: var(--forest);
  background: color-mix(in oklch, var(--background) 70%, transparent);
  transition: background 0.2s ease, transform 0.2s ease;
}

.dark .icon-btn {
  color: var(--foreground);
}

.icon-btn:hover {
  background: var(--secondary);
  transform: translateY(-1px);
}

.mobile-nav {
  display: grid;
  gap: 0.15rem;
  padding: 0.5rem 1rem 1.25rem;
  width: min(1200px, calc(100% - 1.75rem));
  margin: 0 auto;
}

.mobile-link {
  display: block;
  padding: 0.85rem 1rem;
  border-radius: 0.75rem;
  font-family: var(--font-serif);
  font-size: 1.25rem;
  color: var(--muted-foreground);
}

.mobile-link.active,
.mobile-link:hover {
  color: var(--forest);
  background: color-mix(in oklch, var(--forest) 7%, transparent);
}

.dark .mobile-link.active,
.dark .mobile-link:hover {
  color: var(--gold);
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.25s var(--ease-out), transform 0.25s var(--ease-out);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (min-width: 1100px) {
  .desktop-nav {
    display: flex;
  }

  .menu-btn {
    display: none;
  }

  .mobile-nav {
    display: none;
  }
}
</style>
