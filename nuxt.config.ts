// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    adminPassword: process.env.ADMIN_PASSWORD || '',
    adminSessionSecret: process.env.ADMIN_SESSION_SECRET || '',
  },
  app: {
    head: {
      title: 'In Loving Memory — Forever in Our Hearts',
      htmlAttrs: { lang: 'en' },
      meta: [
        {
          name: 'description',
          content: "A celebration of a beloved father's life, love and lasting legacy.",
        },
        { name: 'author', content: 'Family' },
        { property: 'og:title', content: 'In Loving Memory — Forever in Our Hearts' },
        {
          property: 'og:description',
          content: "A celebration of a beloved father's life, love and lasting legacy.",
        },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap',
        },
      ],
    },
  },
})
