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

  const canHover = window.matchMedia('(hover: hover)').matches
  if (!canHover) return

  const slideEls = sliderRef.value?.querySelectorAll('.single-image')
  if (!slideEls) return

  slideEls.forEach((slide) => {
    const overlay = slide.querySelector('.overlay')
    const content = slide.querySelector('.parallax-content')
    const image = slide.querySelector('.parallax-image')
    const items = slide.querySelectorAll('.stagger-item')

    // 🔥 estado inicial
    gsap.set(content, { opacity: 0, y: 40 })
    gsap.set(items, { opacity: 0, y: 20 })
    gsap.set(overlay, {
      opacity: 0,
      scale: 1.15
      // transformOrigin: 'center'
    })

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'power3.out' }
    })

    tl.to(overlay, {
      opacity: 1,
      scale: 1,
      duration: 0.4
    })
      .to(
        image,
        {
          scale: 1.08,
          y: -15,
          duration: 0.8
        },
        0
      )
      .to(
        content,
        {
          opacity: 1,
          y: 0,
          duration: 0.4
        },
        '-=0.3'
      )
      .to(
        items,
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.35
        },
        '-=0.2'
      )

    // 🎯 hover handlers
    const onEnter = () => tl.play()
    const onLeave = () => tl.reverse()

    // 🎯 mouse parallax
    const onMove = (e) => {
      const rect = slide.getBoundingClientRect()

      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      gsap.to(image, {
        x: x * 15,
        y: y * 15,
        duration: 0.5,
        overwrite: 'auto'
      })

      gsap.to(content, {
        x: x * 30,
        y: y * 30,
        duration: 0.5,
        overwrite: 'auto'
      })
    }

    const onLeaveMove = () => {
      gsap.to([image, content], {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto'
      })
    }

    slide.addEventListener('mouseenter', onEnter)
    slide.addEventListener('mouseleave', onLeave)
    slide.addEventListener('mousemove', onMove)
    slide.addEventListener('mouseleave', onLeaveMove)

    cleanupFns.push(() => {
      slide.removeEventListener('mouseenter', onEnter)
      slide.removeEventListener('mouseleave', onLeave)
      slide.removeEventListener('mousemove', onMove)
      slide.removeEventListener('mouseleave', onLeaveMove)
      tl.kill()
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
    <div class="single-image relative h-full">
      <!-- Overlay radial -->
      <div
        class="overlay pointer-events-none absolute inset-0 z-10 scale-110 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.6)_40%,rgba(0,0,0,0.9)_100%)] opacity-0 dark:bg-[radial-gradient(circle_at_center,rgba(231,225,177,0.25)_0%,rgba(231,225,177,0.15)_40%,rgba(231,225,177,0.85)_100%)]"
      ></div>
      <!-- Imagen -->
      <ElementsMediaImageItem
        class="parallax-image block h-full w-full object-cover will-change-transform"
        :src="image.asset._ref"
        :alt="image.alt"
        :modifiers="{
          crop: image.crop,
          hotspot: image.hotspot,
          q: 80
        }"
        sizes="xs:100vw"
        fit="cover"
      />
      <!-- Contenido -->
      <div
        class="parallax-content absolute inset-x-0 bottom-0 z-20 w-full p-4 will-change-transform lg:top-0 lg:bottom-auto lg:left-0 lg:h-full lg:w-1/3 lg:p-6"
      >
        <div
          class="dark:bg-beige/70 rounded-2xl bg-white/70 p-5 shadow-sm backdrop-blur-md lg:mt-6"
        >
          <h2 class="stagger-item text-lg font-semibold">
            {{ content.title }}
          </h2>

          <p class="stagger-item mt-2 text-sm">
            {{ content.text }}
          </p>

          <div
            v-if="content.link"
            class="stagger-item mt-3"
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

<style></style>
