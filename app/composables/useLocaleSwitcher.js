// ~/composables/useLocaleSwitcher.js
import { useRoute, useRouter } from 'vue-router'
import { useSwitchLocalePath } from '#imports'
import { unref } from 'vue'

export function useLocaleSwitcher(currentDocRef) {
  const route = useRoute()
  const router = useRouter()
  const switchLocalePath = useSwitchLocalePath()

  const switchLocale = (targetLang) => {
    const currentDoc = unref(currentDocRef)

    // 1️⃣ Si no hay documento o traducciones → home
    if (!currentDoc?._translations?.length) {
      return router.push(switchLocalePath(targetLang))
    }

    // 2️⃣ Buscar traducción del documento actual
    const translated = currentDoc._translations.find(
      (t) => t.language === targetLang
    )

    // 3️⃣ Si no hay traducción → home del idioma
    if (!translated?.slug) {
      return router.push(switchLocalePath(targetLang))
    }

    // // 4️⃣ Construir params nuevos según la ruta actual
    // const params = { ...route.params }

    // if ('proyecto' in params) {
    //   params.proyecto = translated.slug
    // } else if ('categoria' in params) {
    //   params.categoria = translated.slug
    // }

    // // 5️⃣ Navegar a la ruta traducida
    // return router.push(switchLocalePath(targetLang, params))
  }

  return { switchLocale }
}
