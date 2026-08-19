import { defaultContent } from '~/data/memorial'
import type { SiteContent } from '~/types/content'

export function useMemorialContent() {
  const { data, refresh, status } = useAsyncData(
    'site-content',
    () => $fetch<SiteContent>('/api/content'),
    { default: () => defaultContent },
  )

  const content = computed(() => data.value || defaultContent)

  return { content, refresh, status }
}
