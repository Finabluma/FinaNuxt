export const homeQuery = groq`
  *[_type == "homeType" && language == $lang][0]{
    "id":_id,
    title,
    blockComponents[]{
      ...,
      _type,
      _key    
    },
    language
  }
`

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
