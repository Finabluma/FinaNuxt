export const heroSliderQuery = groq`
*[_type == "heroSliderType" && language == $language][0]{
  slides[]{
    title,
    text,
    rotatewords,
    layout,
    image{
      asset->{
        url
      }
    }
  },
  language,
  title
}`
