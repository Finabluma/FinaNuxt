<script setup>
import { ref, watch, nextTick } from 'vue'
import gsap from 'gsap'
import { useTheme } from '@/composables/useTheme'

const { themeMode, toggleTheme } = useTheme()

const btnRef = ref(null)

/**
 * ✨ micro animación cuando cambia el tema
 */
const animate = async () => {
  await nextTick()

  gsap.fromTo(
    btnRef.value,
    {
      scale: 0.85,
      opacity: 0.6,
      rotate: -10
    },
    {
      scale: 1,
      opacity: 1,
      rotate: 0,
      duration: 0.4,
      ease: 'power3.out'
    }
  )
}

watch(themeMode, animate)
</script>

<template>
  <button
    ref="btnRef"
    class="header-item flex items-center justify-center"
    aria-label="Cambiar tema"
    @click="toggleTheme"
  >
    <!-- Light -->
    <Icon
      v-if="themeMode === 'light'"
      name="line-md:sun-rising-twotone-loop"
      size="24"
    />

    <!-- Dark -->
    <Icon
      v-else-if="themeMode === 'dark'"
      name="line-md:moon-rising-twotone-alt-loop"
      size="24"
    />

    <!-- System -->
    <Icon
      v-else
      name="line-md:computer-twotone"
      size="24"
    />
  </button>
</template>
