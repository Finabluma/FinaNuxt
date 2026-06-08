<script setup>
import { useTheme } from '@/composables/useTheme'

const { themeMode, toggleTheme } = useTheme()
</script>

<template>
  <button
    class="flex items-center justify-center rounded border-2 p-2 transition-colors duration-300"
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

    <!-- Auto / Sistema -->
    <Icon
      v-else
      name="line-md:computer-twotone"
      size="24"
    />
  </button>
</template>
