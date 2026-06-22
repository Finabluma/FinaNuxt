<script setup>
const props = defineProps({
  slides: {
    type: Array
  },
  title: {
    type: String
  }
})
</script>
<template>
  <div class="slide">
    <h2>
      {{ title }}
    </h2>
    <div class="gallery">
      <LazyClientOnly>
        <swiper-container
          :height="300"
          :auto-height="false"
          :modules="[SwiperAutoplay, SwiperFreeMode, SwiperPagination]"
          :slides-per-view="2"
          :space-between="5"
          :speed="1000"
          :free-mode="false"
          :pagination="{ clickable: true }"
          :loop="true"
          :breakpoints="{
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            768: {
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
          >
            <div class="absolute right-auto bottom-0 left-auto z-10 w-full p-2">
              <div class="bg-amber-50/70 p-5 shadow-2xl">
                <h2 class="f-body-lg">{{ item.content.title }}</h2>
                <p>{{ item.content.text }}</p>
                <ElementsTextLink
                  :link="item.link"
                  size="sm"
                />
              </div>
            </div>
            <ElementsMediaImageItem
              :src="item.image.asset._ref"
              :alt="item.image.alt"
              sizes="xs:100vw"
              :modifiers="{
                crop: item.image.crop,
                hotspot: item.image.hotspot,
                q: 80
              }"
              fit="cover"
            />
          </swiper-slide>
        </swiper-container>
      </LazyClientOnly>
    </div>
  </div>
</template>

<!-- {
  "external": {
    "type": "url",
    "value": "finabluma.com"
  },
  "kind": "external",
  "label": "enlace"
} -->
