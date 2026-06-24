export const homeQuery = groq`
  *[_type == "homeType" && language == $lang][0]{
    _id,
    title,
    sections[]{
      _type,
      _key,
      ...
    },
    language
  }
`
