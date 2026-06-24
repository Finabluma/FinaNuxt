<script setup>
import { computed, watch } from 'vue'
import { defineAsyncComponent } from 'vue'

const { locale } = useI18n()
const homeStore = useHomeStore()

/**
 * COMPONENT MAP (lazy + SSR-safe)
 */
const components = {
  heroBlockType: defineAsyncComponent(
    () => import('~/components/TextSequence.vue')
  ),
  heroSingleType: defineAsyncComponent(
    () => import('~/components/SingleImage.vue')
  ),
  heroSliderType: defineAsyncComponent(
    () => import('~/components/SlideShow.vue')
  ),
  textBlockType: defineAsyncComponent(
    () => import('~/components/TextBlock.vue')
  ),
  ctaBlockType: defineAsyncComponent(() => import('~/components/CtaBlock.vue'))
}

/**
 * 🚀 SSR FETCH vía STORE (única fuente de datos)
 * Nuxt 4: useAsyncData solo orquesta el SSR, no duplica estado
 */
const { pending, error, refresh } = await useAsyncData(
  () => `home-${locale.value}`,
  async () => homeStore.fetchHome(locale.value)
)

/**
 * 📦 UI SIEMPRE desde el store (single source of truth)
 */
const data = computed(() => homeStore.data)
const sections = computed(() => data.value?.sections ?? [])
const title = computed(() => data.value?.title ?? '')

/**
 * 🌍 Cambio de idioma → refetch correcto
 */
watch(locale, async () => {
  await refresh()
})
</script>

<template>
  <main id="main">
    <h1 class="sr-only">{{ title }}</h1>

    <!-- loading solo primera carga -->
    <div v-if="pending && !sections.length">Loading...</div>

    <div v-else-if="error">Error cargando la página</div>

    <div v-else>
      <component
        v-for="block in sections"
        :key="block._key"
        :is="components[block._type]"
        v-bind="block"
      />
    </div>
  </main>
</template>
