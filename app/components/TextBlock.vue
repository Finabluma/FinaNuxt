<script setup>
const props = defineProps({
  title: String,
  text: String,
  alignment: {
    type: String,
    default: 'left'
  },
  size: {
    type: String,
    default: 'normal'
  }
})

// 🧠 clases dinámicas (simple y limpio)
const alignmentClass = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
}

const sizeClass = {
  normal: 'text-base md:text-lg',
  large: 'text-xl md:text-3xl'
}
</script>

<template>
  <section class="mx-auto max-w-3xl px-6 py-12">
    <!-- TÍTULO -->
    <h2
      v-if="title"
      class="mb-4 font-semibold"
      :class="alignmentClass[alignment]"
    >
      {{ title }}
    </h2>

    <!-- TEXTO -->
    <p
      v-if="text"
      class="leading-relaxed text-gray-700"
      :class="[alignmentClass[alignment], sizeClass[size]]"
    >
      {{ text }}
    </p>
  </section>
</template>
