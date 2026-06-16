<script setup>
import { ref, watch, onMounted } from 'vue'
import { useTextAnimator } from '~/composables/useTextAnimator'

const props = defineProps({
  textSequence: Object,
  prefix: String
})

const el = ref(null)

let currentTl = null

const runAnimation = () => {
  const items = props.textSequence?.items
  const mode = props.textSequence?.mode

  if (!el.value || !items?.length) return

  if (currentTl) {
    currentTl.kill()
  }

  currentTl = useTextAnimator(el, items, mode)
}

onMounted(runAnimation)

watch(() => props.textSequence, runAnimation, { deep: true })
</script>

<template>
  <h1>
    <span class="mr-2">{{ prefix }}</span>

    <span ref="el"></span>

    <span
      v-if="textSequence.mode === 'typewriter'"
      class="cursor"
      >|</span
    >
  </h1>
</template>
<style lang="postcss" scoped>
.cursor {
  animation: blink 1s infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
