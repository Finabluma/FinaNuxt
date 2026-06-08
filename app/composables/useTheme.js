import { ref, onMounted, watch } from 'vue'

export const useTheme = () => {
  // Valores: "auto" | "light" | "dark"
  const themeMode = ref('auto')

  const updateHtmlClass = () => {
    if (typeof document === 'undefined') return
    const html = document.documentElement

    if (themeMode.value === 'dark') {
      html.classList.add('dark')
    } else if (themeMode.value === 'light') {
      html.classList.remove('dark')
    } else if (themeMode.value === 'auto') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      if (prefersDark) html.classList.add('dark')
      else html.classList.remove('dark')
    }
  }

  const setTheme = (mode) => {
    themeMode.value = mode
    localStorage.setItem('themeMode', mode)
    updateHtmlClass()
  }

  const toggleTheme = () => {
    // Ciclo entre: auto → light → dark → auto …
    if (themeMode.value === 'auto') setTheme('light')
    else if (themeMode.value === 'light') setTheme('dark')
    else setTheme('auto')
  }

  onMounted(() => {
    const saved = localStorage.getItem('themeMode')
    if (saved === 'auto' || saved === 'light' || saved === 'dark') {
      themeMode.value = saved
    }
    updateHtmlClass()
  })

  // Reaplicar clase si cambia modo reactivo
  watch(themeMode, () => updateHtmlClass())

  return { themeMode, toggleTheme, setTheme }
}
