<script setup lang="ts">
const { init } = useTheme()

onMounted(() => init())
</script>

<template>
  <div class="site">
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
    <BackgroundMusic />
  </div>
</template>

<style scoped>
.site {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
