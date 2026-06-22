<script setup>
import { computed } from 'vue'

const props = defineProps({
  link: {
    type: Object,
    required: true
  },
  variant: {
    type: String,
    default: 'primary' // primary | secondary | ghost | outline
  },
  size: {
    type: String,
    default: 'md'
  },
  block: Boolean
})

/**
 * 👉 Resolve href from Sanity link object
 */
const href = computed(() => {
  const link = props.link
  if (!link) return '#'

  if (link.kind === 'external' && link.external) {
    const { type, value } = link.external

    if (type === 'mailto') return `mailto:${value}`
    if (type === 'tel') return `tel:${value}`

    // normalize url
    return value?.startsWith('http') ? value : `https://${value}`
  }

  if (link.kind === 'internal' && link.internal?.slug?.current) {
    return `/${link.internal.slug.current}`
  }

  return '#'
})

/**
 * 👉 External vs internal routing
 */
const isExternal = computed(() => props.link?.kind === 'external')

/**
 * 🎨 Button variants (tu design system)
 */
const variantMap = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  outline: 'btn-outline'
}

/**
 * 📏 Sizes (opcional pero útil)
 */
const sizeMap = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-6 py-3'
}

/**
 * 🧱 Final classes
 */
const classes = computed(() => [
  'btn',
  variantMap[props.variant] || variantMap.primary,
  sizeMap[props.size] || sizeMap.md,
  props.block ? 'w-full' : ''
])
</script>

<template>
  <component
    :is="isExternal ? 'a' : 'NuxtLink'"
    :href="isExternal ? href : undefined"
    :to="!isExternal ? href : undefined"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    :class="classes"
  >
    <slot>
      {{ link.label || 'Botón' }}
    </slot>
  </component>
</template>
