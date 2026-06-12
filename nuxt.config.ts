// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/sanity',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxt/icon',
    '@pinia/nuxt',
    'nuxt-swiper'
  ],
  css: ['./app/assets/css/main.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [
        // Preconnect to Typekit domain to speed up connection
        {
          rel: 'preconnect',
          href: 'https://use.typekit.net',
          crossorigin: 'anonymous'
        },
        { rel: 'dns-prefetch', href: 'https://use.typekit.net' },
        // The actual stylesheet link for Adobe Fonts
        { rel: 'stylesheet', href: 'https://use.typekit.net/jag8dgn.css' }
      ]
    }
  },
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: process.env.SANITY_API_VERSION,
    useCdn: false
  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
      alwaysRedirect: true
    },
    locales: [
      { code: 'en', language: 'en-US', name: 'English' },
      { code: 'es', language: 'es-ES', name: 'Español' }
    ],
    strategy: 'prefix_except_default',
    defaultLocale: 'es',
    vueI18n: '~/i18n/i18n.config.ts'
  },
  // This makes Tailwind work with Vite
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'react-compiler-runtime',
        'react',
        'react-dom'
      ]
    },
    plugins: [tailwindcss()],
    build: {
      minify: 'terser',
      cssCodeSplit: true,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.info', 'console.debug', 'console.warn']
        },
        format: {
          comments: false
        }
      }
    }
  }
})