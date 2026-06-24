<script setup>
import { onMounted, nextTick, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  slides: Array,
  title: String
})

const container = ref(null)
const track = ref(null)

onMounted(() => {
  nextTick(() => {
    const containerEl = container.value
    const trackEl = track.value

    if (!containerEl || !trackEl) return

    const slides = trackEl.querySelectorAll('.slide-item')

    // 🔥 estado inicial (CLAVE)
    gsap.set('.content-card', { opacity: 0, y: 10 })
    gsap.set('.stagger-item', { opacity: 0, y: 10 })

    const getScrollDistance = () => trackEl.scrollWidth - window.innerWidth

    // 🚀 horizontal scroll
    const tl = gsap.to(trackEl, {
      x: () => -getScrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: containerEl,
        start: 'top top',
        end: () => '+=' + trackEl.scrollWidth,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    })

    // 🧲 snap
    ScrollTrigger.create({
      trigger: containerEl,
      start: 'top top',
      end: () => '+=' + trackEl.scrollWidth,
      snap: {
        snapTo: 1 / (slides.length - 1),
        duration: 0.4,
        ease: 'power2.out'
      }
    })

    // 🎥 parallax ligero
    slides.forEach((slide) => {
      const image = slide.querySelector('img')
      if (!image) return

      gsap.to(image, {
        x: -40,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: slide,
          containerAnimation: tl,
          start: 'left right',
          end: 'right left',
          scrub: true
        }
      })
    })
  })
})

/* =========================
   ✨ HOVER ENTER
========================= */
function onEnter(e) {
  const slide = e.currentTarget

  const card = slide.querySelector('.content-card')
  const items = slide.querySelectorAll('.stagger-item')
  const image = slide.querySelector('img')

  gsap.killTweensOf([card, items, image])

  gsap.to(card, {
    opacity: 1,
    y: 0,
    duration: 0.25,
    ease: 'power2.out'
  })

  gsap.to(items, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    stagger: 0.05,
    ease: 'power2.out'
  })

  gsap.to(image, {
    scale: 1.06,
    duration: 0.5,
    ease: 'power2.out'
  })
}

/* =========================
   🔁 HOVER LEAVE
========================= */
function onLeave(e) {
  const slide = e.currentTarget

  const card = slide.querySelector('.content-card')
  const items = slide.querySelectorAll('.stagger-item')
  const image = slide.querySelector('img')

  gsap.killTweensOf([card, items, image])

  gsap.to(card, {
    opacity: 0,
    y: 10,
    duration: 0.2
  })

  gsap.to(items, {
    opacity: 0,
    y: 10,
    duration: 0.2,
    stagger: 0.03
  })

  gsap.to(image, {
    scale: 1,
    duration: 0.4
  })
}
</script>

<template>
  <div
    ref="container"
    class="flex h-screen items-center overflow-hidden"
  >
    <div
      ref="track"
      class="flex h-auto w-max xl:h-[80vh]"
    >
      <div
        v-for="item in slides"
        :key="item._key"
        class="slide-item relative w-[85vw] shrink-0 px-4"
        @mouseenter="onEnter"
        @mouseleave="onLeave"
      >
        <div class="relative h-full w-full overflow-hidden rounded-2xl">
          <ElementsMediaImageItem
            :src="item.image.asset._ref"
            :alt="item.image.alt"
            :modifiers="{
              crop: item.image.crop,
              hotspot: item.image.hotspot,
              q: 80
            }"
            fit="cover"
          />

          <div class="overlay"></div>

          <div class="content">
            <div class="content-card">
              <h2 class="stagger-item text-lg font-semibold">
                {{ item.content.title }}
              </h2>

              <p class="stagger-item mt-2 text-sm">
                {{ item.content.text }}
              </p>

              <div
                v-if="item.link"
                class="stagger-item mt-3"
              >
                <ElementsTextLink :link="item.link" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform-origin: center;
}

.overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.6)
  );
  pointer-events: none;
}

.content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 1rem;
}

/* 🔥 IMPORTANTE: estado base limpio */
.content-card {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(14px);
  border-radius: 16px;
  padding: 1rem;

  opacity: 0;
  transform: translate3d(0, 10px, 0);
}

.slide-item {
  will-change: transform;
}
</style>
