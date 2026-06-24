<script setup>
const props = defineProps({
  title: String,
  text: String,
  cta: Object
})
</script>

<template>
  <div class="flex h-screen items-center">
    <section class="mx-auto max-w-3xl px-6 text-center">
      <!-- TÍTULO -->
      <h2
        v-if="title"
        class="mb-4 text-2xl font-semibold md:text-4xl"
      >
        {{ title }}
      </h2>

      <!-- TEXTO -->
      <p
        v-if="text"
        class="mb-8 leading-relaxed text-gray-600"
      >
        {{ text }}
      </p>

      <!-- 🔥 CTA REUTILIZABLE (TU COMPONENTE REAL) -->
      <ElementsTextLink
        v-if="cta"
        :link="cta.link"
        variant="outline"
        size="lg"
      />
    </section>
  </div>
</template>
