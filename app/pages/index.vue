<script setup>
const { locale } = useI18n()
const homeStore = useHomeStore()

const { data } = await useAsyncData('home', async () => {
  await homeStore.fetchHome(locale.value)
  return homeStore.data
})
</script>

<template>
  <div>
    <main id="main">
      <h1 class="sr-only">{{ data.title }}</h1>
      <div
        v-for="block in data.sections"
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

        <TextBlock
          v-if="block?._type === 'textBlockType'"
          v-bind="block"
        />
        <CtaBlock
          v-if="block?._type === 'ctaBlockType'"
          v-bind="block"
        />
      </div>
    </main>
  </div>
</template>
