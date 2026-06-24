<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  image: Object,
  content: Object
})

const sliderRef = ref(null)

let cleanupFns = []

onMounted(async () => {
  await nextTick()

  const slideEls = sliderRef.value?.querySelectorAll('.single-image')
  if (!slideEls) return

  slideEls.forEach((slide) => {
    const overlay = slide.querySelector('.overlay')
    const content = slide.querySelector('.parallax-content')
    const image = slide.querySelector('.parallax-image')

    // estado inicial overlay
    gsap.set(overlay, {
      opacity: 1,
      '--x': '50%',
      '--y': '50%'
    })

    const canHover = window.matchMedia('(hover: hover)').matches

    let tl = null

    if (canHover) {
      tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out' }
      })

      tl.to(image, {
        scale: 1.08,
        y: -15,
        duration: 0.8
      })
    }

    // 🎯 mouse move (PARALLAX + GRADIENTE)
    const onMove = (e) => {
      const rect = slide.getBoundingClientRect()

      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      const xCentered = x - 0.5
      const yCentered = y - 0.5

      // PARALLAX
      gsap.to(image, {
        x: xCentered * 15,
        y: yCentered * 15,
        duration: 0.5,
        overwrite: 'auto'
      })

      gsap.to(content, {
        x: xCentered * 30,
        y: yCentered * 30,
        duration: 0.5,
        overwrite: 'auto'
      })

      // 🔥 GRADIENTE DINÁMICO
      gsap.to(overlay, {
        '--x': `${x * 100}%`,
        '--y': `${y * 100}%`,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const onEnter = () => {
      if (tl) tl.play()
    }

    const onLeave = () => {
      if (tl) tl.reverse()

      // reset parallax
      gsap.to([image, content], {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      })

      // reset gradiente al centro
      gsap.to(overlay, {
        '--x': '50%',
        '--y': '50%',
        duration: 0.6,
        ease: 'power3.out'
      })
    }

    slide.addEventListener('mousemove', onMove)

    if (canHover) {
      slide.addEventListener('mouseenter', onEnter)
      slide.addEventListener('mouseleave', onLeave)
    }

    cleanupFns.push(() => {
      slide.removeEventListener('mousemove', onMove)
      slide.removeEventListener('mouseenter', onEnter)
      slide.removeEventListener('mouseleave', onLeave)
      if (tl) tl.kill()
    })
  })
})

onBeforeUnmount(() => {
  cleanupFns.forEach((fn) => fn())
  cleanupFns = []
})
</script>
<template>
  <div
    class="overflow-hidden will-change-transform"
    ref="sliderRef"
  >
    <div class="single-image relative h-full overflow-hidden">
      <!-- 🔥 OVERLAY DINÁMICO -->
      <div class="overlay pointer-events-none absolute inset-0 z-10"></div>

      <!-- Imagen -->
      <ElementsMediaImageItem
        class="parallax-image block h-full w-full object-cover will-change-transform"
        :src="image.asset._ref"
        :alt="image.alt"
        sizes="xs:100vw"
        fit="cover"
      />

      <!-- Contenido SIEMPRE visible -->
      <div
        class="parallax-content absolute inset-x-0 bottom-0 z-20 w-full p-4 will-change-transform lg:top-0 lg:left-0 lg:h-full lg:w-1/3 lg:p-6"
      >
        <div
          class="dark:bg-beige/70 rounded-2xl bg-white/70 p-5 shadow-sm backdrop-blur-md"
        >
          <h2 class="text-lg font-semibold">
            {{ content.title }}
          </h2>

          <p class="mt-2 text-sm">
            {{ content.text }}
          </p>

          <div
            v-if="content.link"
            class="mt-3"
          >
            <ElementsTextLink
              :link="content.link.link"
              variant="primary"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  --x: 50%;
  --y: 50%;

  background: radial-gradient(
    circle at var(--x) var(--y),
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.35) 35%,
    rgba(0, 0, 0, 0.85) 100%
  );

  transition: background 0.2s ease;
}
</style>
