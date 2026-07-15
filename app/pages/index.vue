<script setup lang="ts">
useSeoMeta({
  title: 'In Loving Memory — Forever in Our Hearts',
})
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero-bg" aria-hidden="true">
        <img src="/images/hero.jpg" alt="" />
        <div class="hero-veil" />
      </div>

      <div class="hero-copy fade-up">
        <p class="dates">1958 — 2024</p>
        <h1>
          In Loving
          <em>Memory</em>
        </h1>
        <div class="divider" />
        <p class="tagline">Forever in our hearts, forever in our memories.</p>
        <NuxtLink to="/story" class="btn cta">Celebrate His Life →</NuxtLink>
      </div>

      <div class="portrait-wrap fade-up-delay">
        <figure class="portrait">
          <img src="/images/portrait.png" alt="A portrait of our beloved father" />
        </figure>
        <p class="caption">Our dearest Papa</p>
      </div>

      <a href="#remember" class="scroll" aria-label="Scroll">Scroll ↓</a>
    </section>

    <section id="remember" class="remember">
      <div class="container-narrow fade-up">
        <blockquote>
          "A husband, a father, and a pastor — he never failed to deliver the word of God.
          His voice still echoes in our hearts."
        </blockquote>

        <div class="actions">
          <NuxtLink to="/memories" class="action">
            <span aria-hidden="true">❦</span>
            Share a Memory
          </NuxtLink>
          <NuxtLink to="/letters" class="action">
            <span aria-hidden="true">✎</span>
            Write a Letter
          </NuxtLink>
          <NuxtLink to="/gallery" class="action">
            <span aria-hidden="true">❋</span>
            View Photos
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: calc(var(--header-h) + 2rem) 1.25rem 5rem;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.85) contrast(0.95);
}

.hero-veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      180deg,
      color-mix(in oklch, var(--background) 35%, transparent) 0%,
      color-mix(in oklch, var(--background) 55%, transparent) 38%,
      color-mix(in oklch, var(--background) 88%, transparent) 78%,
      var(--background) 100%
    ),
    radial-gradient(ellipse at 50% 20%, transparent 20%, color-mix(in oklch, var(--background) 40%, transparent) 100%);
}

.hero-copy {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 40rem;
}

.dates {
  font-size: 0.78rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 500;
  margin-bottom: 1rem;
}

.hero-copy h1 {
  font-size: clamp(3.2rem, 9vw, 5.4rem);
  color: var(--forest);
  font-weight: 500;
  line-height: 0.95;
}

.dark .hero-copy h1 {
  color: var(--foreground);
}

.hero-copy h1 em {
  display: block;
  font-style: italic;
  font-weight: 400;
}

.tagline {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.15rem;
  color: var(--muted-foreground);
  margin-bottom: 1.75rem;
}

.cta {
  margin-top: 0.25rem;
}

.portrait-wrap {
  position: relative;
  z-index: 1;
  margin-top: 3.5rem;
  text-align: center;
  animation: softFloat 6s ease-in-out infinite;
}

.portrait {
  width: min(280px, 72vw);
  margin: 0 auto;
  border-radius: 1.35rem;
  overflow: hidden;
  border: 3px solid color-mix(in oklch, white 75%, transparent);
  box-shadow:
    0 24px 60px color-mix(in oklch, var(--forest) 22%, transparent),
    0 0 0 1px color-mix(in oklch, var(--gold) 25%, transparent);
}

.portrait img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  filter: sepia(0.18) contrast(1.02);
}

.caption {
  margin-top: 1rem;
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--muted-foreground);
}

.scroll {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted-foreground);
  opacity: 0.75;
}

.remember {
  padding: 4rem 0 2rem;
}

blockquote {
  margin: 0 auto 2.75rem;
  max-width: 36rem;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(1.25rem, 2.6vw, 1.65rem);
  line-height: 1.45;
  text-align: center;
  color: var(--forest);
}

.dark blockquote {
  color: var(--foreground);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.85rem;
}

.action {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.85rem 1.25rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: color-mix(in oklch, var(--card) 80%, transparent);
  font-size: 0.9rem;
  color: var(--forest);
  transition: transform 0.25s var(--ease-out), background 0.25s ease, border-color 0.25s ease;
}

.dark .action {
  color: var(--foreground);
}

.action:hover {
  transform: translateY(-2px);
  background: var(--secondary);
  border-color: color-mix(in oklch, var(--gold) 45%, var(--border));
}

.action span {
  color: var(--gold);
}
</style>
