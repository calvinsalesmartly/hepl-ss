<script setup>
const { locales, locale, defaultLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()
const items = computed(() =>
  locales.value.map(l => ({
    label: l.name,
    onSelect: () => {
      router.push(switchLocalePath(l.code))
    }
  }))
)
const currentLocaleName = computed(() =>
  locales.value.find(l => l.code === locale.value)?.name || locale.value
)
</script>

<template>
  <UDropdownMenu
    v-slot="{ open }"
    :modal="false"
    :items="items"
    :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width) min-w-0' }"
    size="xs"
  >
    <UButton
      :label="currentLocaleName"
      variant="subtle"
      trailing-icon="i-lucide-chevron-down"
      size="xs"
      class="-mb-[6px] font-semibold rounded-full truncate"
      :class="[open && 'bg-primary/15']"
      :ui="{
        trailingIcon: ['transition-transform duration-200', open ? 'rotate-180' : undefined].filter(Boolean).join(' ')
      }"
    />
  </UDropdownMenu>
</template>
