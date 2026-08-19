<script setup lang="ts">
const { init } = useTheme()
onMounted(() => init())
</script>

<template>
  <div class="admin-shell">
    <slot />
  </div>
</template>

<style scoped>
.admin-shell {
  min-height: 100vh;
}
</style>
