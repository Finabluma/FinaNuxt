export const homeQuery = groq`
  *[_type == "homeType" && language == $lang][0]{
    "id":_id,
    title,
    blockComponents[]{
      ...,
      _type,
      _key    
    },
    language,
    // "_translations": *[
    //   _type == "translation.metadata" &&
    //   references(^._id)
    // ][0].translations[].value->{
    //   _id,
    //   language
    // }
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
