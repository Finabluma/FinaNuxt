// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app:{
    head:{
      title: 'mi app',
      titleTemplate: '%s | Webdevelopment'
    }
  },
  $development:{
    app:{
      head:{
        title:'DEV',
        titleTemplate: '%s | DEV'
      }
    }
  },
  $production:{
    app:{
      head:{
        title:'Prod',
        titleTemplate: '%s | PROD'
      }
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ]
})