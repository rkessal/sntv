"use client"
import { gsap } from 'gsap'
import useDevice from '@/hooks/useDevice'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import SplitType from 'split-type'
import { intersection } from 'lodash'

const useAnimateAbout = ({ container }) => {
  const { isMobile } = useDevice()
  const paragraphs = useRef(null)


  useGSAP(() => {
    if (isMobile) return

    paragraphs.current = gsap.utils.toArray('.p-about')

    const {words: splitWords} = new SplitType('.p-about', {
      split: 'words',
      tagName: 'span'
    })

    paragraphs.current.forEach((paragraph) => {
      const p = paragraph.querySelectorAll('p')
      const words = intersection(paragraph.querySelectorAll('.word'), splitWords)

      gsap.from(paragraph, {
        duration: 5,
        scrollTrigger: {
          trigger: p,
          pinSpacer: true,
          pin: true,
          scrub: 2,
          start: "-=100%"
        },
      })

      gsap.from(words, {
        stagger: 0.3,
        autoAlpha: 0.3,
        duration: 2,
        scale: 0.98,
        scrollTrigger: {
          trigger: paragraph,
          scrub: true
        }
      })
    })
  }, { scope: container, dependencies: [ isMobile, container.current, paragraphs.current ] })
}

export default useAnimateAbout