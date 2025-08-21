import { useRoute } from '#app'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
export const useCleanPath = () => {
  const route = useRoute()
const { locale, defaultLocale, locales } = useI18n()

  return computed(() => {
    if (locale.value === defaultLocale) {
      return route.path
    }
   // 从 locales 数组里收集所有语言 code
    const codes = locales.value.map((l: any) => l.code)

    // 构造正则： ^/(vi|en)(?=/|$)
    const regex = new RegExp(`^/(${codes.join('|')})(?=/|$)`)

    return route.path.replace(regex, '') || '/'
  })
}
