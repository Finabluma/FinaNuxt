<template>
  <div
    ref="wrapper"
    class="page"
  >
    <!-- CONTENIDO PRINCIPAL -->
    <section class="content">
      <h1>Contenido de la página</h1>
      <p>Haz scroll hacia abajo</p>
    </section>

    <!-- FOOTER FIJO -->
    <footer
      ref="footer"
      class="footer"
    >
      <h2>Footer animado</h2>
    </footer>

    <!-- spacer para permitir scroll -->
    <div class="spacer"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const footer = ref(null)

onMounted(() => {
  const el = footer.value

  // Estado inicial: footer escondido abajo
  gsap.set(el, {
    y: 120,
    scale: 1,
    opacity: 1
  })

  // Animación tipo "bounce al entrar"
  gsap.to(el, {
    y: 0,
    ease: 'bounce.out',
    scrollTrigger: {
      trigger: '.spacer',
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: true
    }
  })

  // pequeño “lift feel” extra (opcional estilo premium)
  gsap.fromTo(
    el,
    { scale: 0.98 },
    {
      scale: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.spacer',
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true
      }
    }
  )
})
</script>

<style scoped>
.page {
  position: relative;
  min-height: 200vh;
  background: #0b0b0b;
  color: white;
}

.content {
  padding: 120px 40px;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 220px;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* clave del efecto scroll */
.spacer {
  height: 120vh;
}
</style>
