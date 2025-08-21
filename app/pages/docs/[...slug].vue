<script setup >
definePageMeta({
  layout: 'docs'
})
const config = useRuntimeConfig()
const route = useRoute()
const { locale } = useI18n()
console.log(route.path, route.path.replace(`/${locale.value}`, ''))
const cleanPath = useCleanPath()
console.log(cleanPath.value)

const { data: page } = await useAsyncData(route.path, () => queryCollection('docs_' + locale.value).path(cleanPath.value).first(), {
  watch: [locale] // Refetch when locale changes
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('docs_' + locale.value, cleanPath.value, {
    fields: ['description']
  })
}, {
  watch: [locale] // Refetch when locale changes
})

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

console.log('asda',page.value);

useSeoMeta({
  title,
  ogTitle: page.value.meta.ogTitle ||title,
  description,
  ogDescription:  page.value.meta.ogDescription ||description,
  ogImage: page.value.meta.ogImage ,
  ogUrl:`https://help.salesmartly.${config.public.SITE_URL}${page.value.path}/` ,
  ogType: 'article',
  twitterCard:page.value.meta.twitterCard||'summary_large_image',
  twitterSite:page.value.meta.twitterSite || (config.public.SITE_URL=='vn'? "@SalesmartlyVietnam" : "@SalesmartlyIndonesia" ),
  twitterTitle:page.value.meta.twitterTitle ||title,
  twitterDescription:page.value.meta.twitterDescription ||title,
  twitterImage: page.value.meta.twitterImage ,
  robots: page.value.meta.robots || 'index, follow',
})

// defineOgImageComponent('Saas')
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
      :description="page.description"
    />

    <UPageBody>
      <ContentRenderer
        v-if="page.body"
        :value="page"
      />

      <USeparator v-if="surround?.length" />

      <UContentSurround :surround="surround" />
    </UPageBody>

    <template
      v-if="page?.body?.toc?.links?.length"
      #right
    >
      <UContentToc :links="page.body.toc.links" />
    </template>
  </UPage>
</template>
