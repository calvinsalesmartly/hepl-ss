// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@vueuse/nuxt'
    // 'nuxt-og-image'
  ],
  devtools: {
    enabled: true
  },
  css: ['~/assets/css/main.css'],
  ui: {
    fonts: false
  },
  runtimeConfig: {
    public: {
      SITE_URL: process.env.SITE_URL || 'vn',
      DEF_LANG: process.env.DEF_LANG || 'vi'
    }
  },

  routeRules: {
    '/docs': { redirect: '/docs/getting-started', prerender: false },
    '/en/docs': { redirect: '/en/docs/getting-started', prerender: false }

  },
  compatibilityDate: '2024-07-11',
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  i18n: {
    locales: process.env.DEF_LANG == 'vi'
      ? [
          { code: 'vi', name: 'Tiếng Việt', language: 'vi' },
          { code: 'en', name: 'English', language: 'en' }
        ]
      : [
          { code: 'id', name: 'Indonesia', language: 'id' },
          { code: 'en', name: 'English', language: 'en' }

        ],
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: false,
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: process.env.DEF_LANG
    },
    defaultLocale: process.env.DEF_LANG
  }
})
