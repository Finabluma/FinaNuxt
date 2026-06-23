<script setup>
const { locale } = useI18n()
const homeStore = useHomeStore()
await callOnce(() => homeStore.fetchHome(locale.value))
</script>

<template>
  <div>
    <main id="main">
      <h1 class="sr-only">{{ homeStore?.data?.title }}</h1>
      <div
        v-for="block in homeStore?.data?.sections"
        :key="block?._key"
      >
        <TextSequence
          v-if="block?._type === 'heroBlockType'"
          v-bind="block"
        />
        <SingleImage
          v-if="block?._type === 'heroSingleType'"
          v-bind="block"
        />
        <SlideShow
          v-if="block?._type === 'heroSliderType'"
          :slides="block.slides"
        />
      </div>
      <br />
      <br />
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
  <!-- <pre>{{ homeStore.data }}</pre> -->
</template>
