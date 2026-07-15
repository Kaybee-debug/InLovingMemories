<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  lede: string
}>()
</script>

<template>
  <header class="page-hero fade-up">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h1>{{ title }}</h1>
    <div class="divider" />
    <p class="lede">{{ lede }}</p>
  </header>
</template>
