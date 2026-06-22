<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'

const headerRef = ref(null)

let lastScrollY = 0
let lastTime = Date.now()

let isHidden = false
let isAnimating = false

// 📏 padding controller
const setPadding = (compact) => {
  gsap.to(headerRef.value, {
    paddingTop: compact ? 6 : 12,
    paddingBottom: compact ? 6 : 12,
    duration: 0.3,
    ease: 'power2.out'
  })
}

// 👁 SHOW
const show = (compact = false) => {
  if (isHidden && !isAnimating) {
    isAnimating = true

    const tl = gsap.timeline({
      onComplete: () => (isAnimating = false)
    })

    tl.to(headerRef.value, {
      y: 0,
      duration: 0.45,
      ease: 'power4.out'
    })

    // ⚡ todos los hijos al mismo tiempo (sin stagger)
    tl.to(
      '.header-item',
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.25,
        ease: 'power2.out'
      },
      '-=0.2'
    )

    isHidden = false
  }

  setPadding(compact)
}

// 🙈 HIDE
const hide = () => {
  if (!isHidden && !isAnimating) {
    isAnimating = true

    const tl = gsap.timeline({
      onComplete: () => (isAnimating = false)
    })

    tl.to('.header-item', {
      opacity: 0,
      y: -10,
      scale: 0.95,
      duration: 0.2,
      stagger: 0.04,
      ease: 'power2.in'
    })

    tl.to(
      headerRef.value,
      {
        y: '-100%',
        duration: 0.45,
        ease: 'power3.inOut'
      },
      '-=0.1'
    )

    isHidden = true
  }
}

// 📜 scroll logic
const onScroll = () => {
  const currentY = window.scrollY
  const currentTime = Date.now()

  const deltaY = currentY - lastScrollY

  // 🟢 TOP STATE (siempre visible + reset compacto)
  if (currentY <= 5) {
    show(false) // no compact
    lastScrollY = currentY
    lastTime = currentTime
    return
  }

  // 👇 scroll down → hide
  if (deltaY > 0 && currentY > 100) {
    hide()
  }

  // 👆 scroll up → show + compact
  if (deltaY < 0) {
    show(true)
  }

  lastScrollY = currentY
  lastTime = currentTime
}

onMounted(() => {
  lastScrollY = window.scrollY
  lastTime = Date.now()

  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
<template>
  <header
    ref="headerRef"
    class="global-header dark:bg-beige fixed top-0 left-0 z-50 w-full bg-white transition-colors duration-300"
  >
    <div class="flex items-center justify-between px-4 py-3">
      <h1 class="header-item font-bold">ofm</h1>

      <div class="header-item flex gap-3">
        <ThemeToogle />
      </div>
    </div>
  </header>
</template>
