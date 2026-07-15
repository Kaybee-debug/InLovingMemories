<template>
  <footer class="footer">
    <div class="container-narrow inner">
      <p class="quote">"Those we love never truly leave us."</p>
      <div class="line" />
      <p class="note">A digital sanctuary — built with love, in his honor.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 3.5rem 0 4rem;
  text-align: center;
}

.inner {
  display: grid;
  gap: 1rem;
  justify-items: center;
}

.quote {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.25rem;
  color: var(--muted-foreground);
}

.line {
  width: 2.5rem;
  height: 1px;
  background: color-mix(in oklch, var(--gold) 65%, transparent);
}

.note {
  font-size: 0.85rem;
  color: var(--muted-foreground);
  letter-spacing: 0.02em;
}
</style>
