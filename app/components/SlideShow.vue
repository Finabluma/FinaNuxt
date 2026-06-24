<script setup>
const props = defineProps({
  slides: Array,
  title: String
})
</script>
<template>
  <div class="slide">
    <h2 class="mb-4 text-xl font-bold">
      {{ title }}
    </h2>

    <swiper-container
      class="gallery"
      :height="300"
      :auto-height="false"
      :slides-per-view="1"
      :space-between="5"
      :loop="true"
      :pagination="{ clickable: true }"
      :speed="900"
      :breakpoints="{
        320: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 10
        }
      }"
    >
      <swiper-slide
        v-for="item in slides"
        :key="item._key"
        class="slide-item overflow-hidden will-change-transform"
      >
        <div class="relative h-full">
          <!-- Overlay radial -->
          <div
            class="overlay pointer-events-none absolute inset-0 z-10 scale-110 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.6)_40%,rgba(0,0,0,0.9)_100%)] opacity-0 dark:bg-[radial-gradient(circle_at_center,rgba(231,225,177,0.25)_0%,rgba(231,225,177,0.15)_40%,rgba(231,225,177,0.85)_100%)]"
          ></div>

          <!-- Imagen -->
          <ElementsMediaImageItem
            class="parallax-image block h-full w-full object-cover will-change-transform"
            :src="item.image.asset._ref"
            :alt="item.image.alt"
            :modifiers="{
              crop: item.image.crop,
              hotspot: item.image.hotspot,
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
              class="rounded-2xl bg-white/70 p-5 shadow-2xl backdrop-blur-md lg:mt-6"
            >
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
                <ElementsTextLink
                  :link="item.link"
                  variant="primary"
                />
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
</template>
<style lang="css">
swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  height: 80vh;
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}
</style>
