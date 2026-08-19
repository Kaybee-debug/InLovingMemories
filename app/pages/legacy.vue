<script setup lang="ts">
const { content } = useMemorialContent()

useSeoMeta({
  title: 'Legacy — In Loving Memory',
  description: 'The values he lived by, the lessons he left, the light he passed on.',
})
</script>

<template>
  <div class="page">
    <div class="container">
      <PageHero
        eyebrow="What He Leaves Behind"
        title="His Legacy"
        lede="Not in things, but in the way we love each other now."
      />

      <div class="values">
        <article
          v-for="(value, i) in content.legacy.values"
          :key="`${value.title}-${i}`"
          class="value fade-up"
          :style="{ animationDelay: `${i * 0.05}s` }"
        >
          <span aria-hidden="true">{{ value.icon }}</span>
          <h3>{{ value.title }}</h3>
          <p>{{ value.text }}</p>
        </article>
      </div>

      <section class="resting fade-up-delay">
        <figure class="stone">
          <img
            :src="content.legacy.resting.imageSrc"
            :alt="content.legacy.resting.imageAlt"
          />
        </figure>

        <div class="resting-copy">
          <p class="eyebrow">{{ content.legacy.resting.eyebrow }}</p>
          <h2>{{ content.legacy.resting.heading }}</h2>
          <p class="epitaph">{{ content.legacy.resting.epitaph }}</p>
          <p class="note">
            {{ content.legacy.resting.note }}
          </p>
          <p class="verse">
            {{ content.legacy.resting.verse }}
          </p>
        </div>
      </section>

      <section class="gift fade-up-delay-2">
        <p class="eyebrow">The lasting gift</p>
        <blockquote>
          "{{ content.legacy.giftQuote }}"
        </blockquote>
        <p class="note">
          {{ content.legacy.giftNote }}
        </p>
        <NuxtLink to="/memories" class="btn">Add to his legacy</NuxtLink>
      </section>
    </div>
  </div>
</template>

<style scoped>
.values {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  margin-bottom: 3rem;
}

.value {
  padding: 1.4rem 1.25rem;
  border-radius: 1.15rem;
  border: 1px solid var(--border);
  background: color-mix(in oklch, var(--card) 90%, transparent);
  text-align: center;
}

.value span {
  display: inline-block;
  color: var(--gold);
  margin-bottom: 0.65rem;
  font-size: 1.1rem;
}

.value h3 {
  font-size: 1.3rem;
  color: var(--forest);
  margin-bottom: 0.45rem;
}

.dark .value h3 {
  color: var(--foreground);
}

.value p {
  color: var(--muted-foreground);
  font-size: 0.95rem;
}

.resting {
  display: grid;
  gap: 1.75rem;
  align-items: center;
  margin-bottom: 3rem;
  padding: 1.25rem;
  border-radius: 1.4rem;
  border: 1px solid var(--border);
  background: color-mix(in oklch, var(--card) 92%, transparent);
}

.stone {
  margin: 0;
  overflow: hidden;
  border-radius: 1.1rem;
}

.stone img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: center 35%;
}

.resting-copy {
  text-align: center;
  padding: 0 0.5rem 0.5rem;
}

.resting-copy h2 {
  font-size: clamp(1.7rem, 3.5vw, 2.3rem);
  color: var(--forest);
  margin: 0.55rem 0 1rem;
}

.dark .resting-copy h2 {
  color: var(--foreground);
}

.epitaph {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.35rem;
  color: var(--gold);
  margin-bottom: 1rem;
}

.verse {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--forest);
  line-height: 1.5;
  margin-top: 1rem;
}

.dark .verse {
  color: var(--foreground);
}

.gift {
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
  padding: 2rem 1.25rem;
  border-radius: 1.4rem;
  border: 1px solid color-mix(in oklch, var(--gold) 35%, var(--border));
  background:
    radial-gradient(ellipse at 50% 0%, color-mix(in oklch, var(--gold) 14%, transparent), transparent 55%),
    color-mix(in oklch, var(--card) 92%, transparent);
}

.gift blockquote {
  margin: 1rem 0;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(1.35rem, 3vw, 1.85rem);
  line-height: 1.35;
  color: var(--forest);
}

.dark .gift blockquote {
  color: var(--foreground);
}

.note {
  color: var(--muted-foreground);
  margin-bottom: 1.5rem;
  line-height: 1.55;
}

@media (min-width: 860px) {
  .resting {
    grid-template-columns: 0.9fr 1.1fr;
    padding: 1.5rem;
    text-align: left;
  }

  .resting-copy {
    text-align: left;
    padding: 0.5rem 1rem 0.5rem 0.25rem;
  }
}
</style>
