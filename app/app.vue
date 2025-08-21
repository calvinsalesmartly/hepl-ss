<script setup lang="ts">
const colorMode = useColorMode()
const config = useRuntimeConfig()
const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')
const { locale } = useI18n()
const localePath = useLocalePath() 
const route = useRoute()
const cleanPath = useCleanPath()
useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
    { key: 'author', name: 'author', content:config.public.SITE_URL=='vn'? "Salesmartly Vietnam" : "Salesmartly Indonesia" },
    
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { key: 'canonical', rel: 'canonical', href:`https://salesmartly.${config.public.SITE_URL}${route.path}/` },
    {  rel: 'alternate', href:`https://salesmartly.${config.public.SITE_URL}${cleanPath.value}/` ,hreflang:"x-default"},
    {  rel: 'alternate', href:`https://salesmartly.${config.public.SITE_URL}/en${cleanPath.value}/` ,hreflang:"en"},

  ],
  htmlAttrs: {
    lang: locale
  }
})

// useSeoMeta({
//   titleTemplate: '%s - Nuxt SaaS template',
//   ogImage: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3NhYXMtdGVtcGxhdGUubnV4dC5kZXYiLCJpYXQiOjE3Mzk0NjM0NDh9.tgzUQaw6XswUPPVbOXazuWwoTHJODg155CYt1xfzIdM.jpg?theme=light',
//   twitterImage: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3NhYXMtdGVtcGxhdGUubnV4dC5kZXYiLCJpYXQiOjE3Mzk0NjM0NDh9.tgzUQaw6XswUPPVbOXazuWwoTHJODg155CYt1xfzIdM.jpg?theme=light',
//   twitterCard: 'summary_large_image'
// })

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs_' + locale.value), {
  transform: data => data.find(item => item.path === `/docs`)?.children || []
}, {
  watch: [locale] // Refetch when locale changes
})
let transPath= (arr)=>{
  arr.forEach(item => {
  item.path=localePath({path: item.path},locale.value)
  if(item.children&&item.children.length){
    transPath(item.children)
  }
})
}
transPath(navigation.value)

console.log('asd',navigation.value);

const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs_' + locale.value), {
  server: false
}, {
  watch: [locale] // Refetch when locale changes
})

const links = [
  {
    label: 'Docs',
    icon: 'i-lucide-book',
    to: localePath('docs')
  },
  {
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

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        shortcut="meta_k"
        :navigation="navigation"
        :links="links"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
