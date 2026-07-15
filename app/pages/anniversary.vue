<script setup lang="ts">
import { farewellDate } from '~/data/memorial'

useSeoMeta({ title: 'Anniversary — In Loving Memory' })

const elapsed = computed(() => {
  const now = new Date()
  let years = now.getFullYear() - farewellDate.getFullYear()
  let months = now.getMonth() - farewellDate.getMonth()
  let days = now.getDate() - farewellDate.getDate()

  if (days < 0) {
    months -= 1
    const prev = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prev.getDate()
  }
  if (months < 0) {
    years -= 1
    months += 12
  }

  const totalDays = Math.max(
    0,
    Math.floor((now.getTime() - farewellDate.getTime()) / 86400000),
  )

  return { years, months, days, totalDays }
})
</script>

<template>
  <div class="page">
    <div class="container">
      <PageHero
        eyebrow="Remembrance"
        title="Anniversary"
        lede="A candle we light, so his light stays with us."
      />

      <section class="memorial fade-up-delay">
        <div class="candle" aria-hidden="true">
          <div class="flame" />
          <div class="wick" />
          <div class="body" />
        </div>

        <p class="since">Since he left us</p>

        <div class="counter">
          <div>
            <strong>{{ elapsed.years }}</strong>
            <span>Years</span>
          </div>
          <div>
            <strong>{{ elapsed.months }}</strong>
            <span>Months</span>
          </div>
          <div>
            <strong>{{ elapsed.days }}</strong>
            <span>Days</span>
          </div>
        </div>

        <p class="total">
          {{ elapsed.totalDays }} days of missing you — and remembering everything.
        </p>
        <p class="dates-note">Passed away 9 July 2024 · Laid to rest 14 July 2024</p>

        <blockquote>
          Though we cannot see you, we feel you in the soft morning light,
          in the pause between our words, in the small acts of kindness we choose because of you.
        </blockquote>
        <p class="sign">— Rest gently, dear Papa.</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.memorial {
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
  padding: 2rem 1.25rem;
}

.candle {
  width: 4rem;
  margin: 0 auto 1.75rem;
  display: grid;
  justify-items: center;
}

.flame {
  width: 0.85rem;
  height: 1.35rem;
  border-radius: 50% 50% 40% 40%;
  background: radial-gradient(circle at 40% 30%, #fff6c8, #f0b429 45%, #d97706 100%);
  animation: candleGlow 2.4s ease-in-out infinite;
  margin-bottom: 0.15rem;
}

.wick {
  width: 2px;
  height: 0.45rem;
  background: #3f3a32;
}

.body {
  width: 1.6rem;
  height: 3.4rem;
  border-radius: 0.25rem 0.25rem 0.4rem 0.4rem;
  background: linear-gradient(180deg, #f5efe3, #e4d5b8);
  box-shadow: inset 0 0 0 1px color-mix(in oklch, var(--gold) 25%, transparent);
}

.since {
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted-foreground);
  margin-bottom: 1.25rem;
}

.counter {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.counter div {
  padding: 1rem 0.5rem;
  border-radius: 1rem;
  border: 1px solid var(--border);
  background: color-mix(in oklch, var(--card) 90%, transparent);
}

.counter strong {
  display: block;
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 500;
  color: var(--forest);
  line-height: 1;
  margin-bottom: 0.35rem;
}

.dark .counter strong {
  color: var(--gold);
}

.counter span {
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted-foreground);
}

.total {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--muted-foreground);
  margin-bottom: 0.75rem;
}

.dates-note {
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  color: var(--gold);
  margin-bottom: 1.75rem;
}

blockquote {
  margin: 0 0 1rem;
  font-family: var(--font-serif);
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--forest);
}

.dark blockquote {
  color: var(--foreground);
}

.sign {
  font-family: var(--font-script);
  font-size: 1.45rem;
  color: var(--gold);
}
</style>
