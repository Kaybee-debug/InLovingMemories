export function useTheme() {
  const isDark = useState('theme-dark', () => false)

  function apply(dark: boolean) {
    if (!import.meta.client) return
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }

  function toggle() {
    isDark.value = !isDark.value
    apply(isDark.value)
  }

  function init() {
    if (!import.meta.client) return
    const saved = localStorage.getItem('theme')
    isDark.value = saved
      ? saved === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches
    apply(isDark.value)
  }

  return { isDark, toggle, init }
}
