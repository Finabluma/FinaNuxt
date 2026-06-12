<script setup>
import { ref } from 'vue'
import { useTextAnimator } from '~/composables/useTextAnimator'

const el = ref(null)

useTextAnimator(
  el,
  ['Design', 'Develop', 'Deploy'],
  'typewriter' // 👈 cambia a 'rotate'
)
</script>

<template>
  <div>
    <h1 class="mx-auto w-3/12 border text-center text-4xl">
      <span class="mr-2">We build</span>
      <span ref="el"></span>
      <span
        v-if="'typewriter'"
        class="cursor"
        >|</span
      >

      <span
        v-else
        class="cursor-dot"
      ></span>
    </h1>
    <main id="main">
      <h1>HTML Ipsum Presents</h1>
      <p>
        <strong>Pellentesque habitant morbi tristique</strong> senectus et netus
        et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat
        vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet
        quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris
        placerat eleifend leo.
        <a href="#">Quisque sit amet est et sapien ullamcorper pharetra</a>.
        Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>,
        ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt
        condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.
        <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.
      </p>
      <h2>Header Level 2</h2>
      <ul>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Aliquam tincidunt mauris eu risus.</li>
        <li>Vestibulum auctor dapibus neque.</li>
      </ul>
      <h3>Header Level 3</h3>
      <p>
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
        ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
        egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend
        leo.
      </p>
      <ol>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Aliquam tincidunt mauris eu risus.</li>
      </ol>
      <blockquote>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          magna. Cras in mi at felis aliquet congue. Ut a est eget ligula
          molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis
          mollis, tellus est malesuada tellus, at luctus turpis elit sit amet
          quam. Vivamus pretium ornare est.
        </p>
      </blockquote>
    </main>
  </div>
</template>

<style scoped>
.cursor {
  animation: blink 1s infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
