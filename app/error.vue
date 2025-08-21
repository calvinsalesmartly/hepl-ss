<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

useHead({
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
})
const { locale } = useI18n()
const localePath = useLocalePath() 
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs_' + locale.value), {
  transform: data => data.find(item => item.path === `/${locale.value}/docs`)?.children || []
}, {
  watch: [locale] // Refetch when locale changes
})
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs_' + locale.value), {
  server: false
}, {
  watch: [locale] // Refetch when locale changes
})
const config = useRuntimeConfig()
const links = [{
  label: 'Docs',
  icon: 'i-lucide-book',
  to: localePath('docs')
}, {
  label: 'Pricing',
  icon: 'i-lucide-credit-card',
  to: `https://salesmartly.${config.public.SITE_URL}/pricing/`
}
// {
//   label: 'Blog',
//   icon: 'i-lucide-pencil',
//   to: '/blog'
// }
]
</script>

<template>
  <div>
    <AppHeader />

    <UMain>
      <UContainer>
        <UPage>
          <UError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        shortcut="meta_k"
        :navigation="navigation"
        :links="links"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>

    <UToaster />
  </div>
</template>
