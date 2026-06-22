<script setup>
import { computed } from 'vue'
import { useI18n, useSwitchLocalePath } from '#i18n'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() =>
  locales.value.filter((i) => i.code !== locale.value)
)
</script>

<template>
  <div class="header-item flex items-center gap-2">
    <NuxtLink
      v-for="loc in availableLocales"
      :key="loc.code"
      :to="switchLocalePath(loc.code)"
      class="lang-link"
      :class="{ 'is-active': loc.code === locale }"
    >
      {{ loc.name }}
    </NuxtLink>
  </div>
</template>
<style lang="postcss" scoped>
.lang-link {
  font-size: 0.9rem;
  opacity: 0.7;
  transition: all 0.2s ease;
  text-decoration: none;
}
</style>
