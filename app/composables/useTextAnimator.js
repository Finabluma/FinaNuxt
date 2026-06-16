import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(TextPlugin)

export function useTextAnimator(elRef, words = [], mode = 'typewriter') {
  const el = elRef.value
  if (!el || !words.length) return null

  gsap.set(el, { text: '' })

  const tl = gsap.timeline({ repeat: -1 })

  if (mode === 'typewriter') {
    words.forEach((word) => {
      tl.to(el, {
        duration: word.length * 0.08,
        text: word,
        ease: 'none'
      })
        .to({}, { duration: 0.8 })
        .to(el, {
          duration: word.length * 0.05,
          text: '',
          ease: 'none'
        })
        .to({}, { duration: 0.3 })
    })
  }

  if (mode === 'rotate') {
    words.forEach((word) => {
      tl.to(el, {
        y: -20,
        opacity: 0,
        duration: 0.3
      })
        .set(el, {
          text: word,
          y: 20
        })
        .to(el, {
          y: 0,
          opacity: 1,
          duration: 0.4
        })
        .to({}, { duration: 1 })
    })
  }

  return tl
}
