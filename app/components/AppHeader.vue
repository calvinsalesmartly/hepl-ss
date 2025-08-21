<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath() 
const config = useRuntimeConfig()
const cleanPath = useCleanPath()

const items = computed(() => [
  {
    label: 'Docs',
    to: localePath('docs'),
    active: cleanPath.value.startsWith('/docs')
  },
  {
    label: 'Pricing',
    to: `https://salesmartly.${config.public.SITE_URL}/pricing/`
  }
  // {
  //   label: 'Blog',
  //   to: '/blog'
  // },
  // {
  //   label: 'Changelog',
  //   to: '/changelog',
  //   badge: {
  //     label: 'New',
  //     color: 'primary' as const
  //   }
  // }
])
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink :to="localePath('index')">
        <LogoPro class="w-auto h-6 shrink-0" />
      </NuxtLink>
      <TemplateMenu />
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <UColorModeButton />

      <UButton
        icon="i-lucide-log-in"
        color="neutral"
        variant="ghost"
        :to="`https://app.salesmartly.com/login?agent=${config.public.SITE_URL}`"
        class="lg:hidden"
      />

      <UButton
        label="Sign in"
        color="neutral"
        variant="outline"
        :to="`https://app.salesmartly.com/login?agent=${config.public.SITE_URL}`"
        class="hidden lg:inline-flex"
      />

      <UButton
        label="Sign up"
        color="neutral"
        trailing-icon="i-lucide-arrow-right"
        class="hidden lg:inline-flex"
        :to="`https://app.salesmartly.com/registration?agent=${config.public.SITE_URL}`"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />

      <USeparator class="my-6" />

      <UButton
        label="Sign in"
        color="neutral"
        variant="subtle"
        :to="`https://app.salesmartly.com/login?agent=${config.public.SITE_URL}`"
        block
        class="mb-3"
      />
      <UButton
        label="Sign up"
        color="neutral"
        :to="`https://app.salesmartly.com/registration?agent=${config.public.SITE_URL}`"
        block
      />
    </template>
  </UHeader>
</template>
