<script setup lang="ts">
defineProps<{
  name: string
  role: string
  accent?: boolean
}>()
</script>

<template>
  <article class="node" :class="{ accent }">
    <span class="mark" aria-hidden="true">{{ accent ? '✦' : '❋' }}</span>
    <h3>{{ name }}</h3>
    <p>{{ role }}</p>
  </article>
</template>

<style scoped>
.node {
  text-align: center;
  padding: 1.25rem 1rem;
  border-radius: 1.1rem;
  background: color-mix(in oklch, var(--card) 90%, transparent);
  border: 1px solid var(--border);
  min-width: 9rem;
  backdrop-filter: blur(8px);
}

.node.accent {
  border-color: color-mix(in oklch, var(--gold) 55%, transparent);
  background: color-mix(in oklch, var(--gold) 10%, var(--card));
  padding: 1.6rem 1.4rem;
}

.mark {
  display: block;
  color: var(--gold);
  margin-bottom: 0.45rem;
  font-size: 0.9rem;
}

h3 {
  font-size: 1.15rem;
  color: var(--forest);
  margin-bottom: 0.25rem;
}

.dark h3 {
  color: var(--foreground);
}

p {
  font-size: 0.8rem;
  color: var(--muted-foreground);
}

.accent h3 {
  font-size: 1.4rem;
}
</style>
