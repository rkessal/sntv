import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import SplitType from 'split-type'

const useAnimateSectionTitle = ({ ref }) => {
  useGSAP(() => {
    const split =  new SplitType(ref.current, {
      split: 'chars',
      charClass: 'title-char',
      tagName: 'span'
    })

    gsap.set(ref.current, {
      overflowY: 'hidden'
    })

    gsap.set(split.chars, {
      verticalAlign: 'text-bottom',
      transformOrigin: 'bottom',
    })

    gsap.from(split.chars, {
      scrollTrigger: ref.current,
      delay: 0.5,
      rotationZ: 7,
      duration: 1,
      yPercent: 150,
      ease: 'power4.out',
      stagger: 0.08,
    })
  }, { scope: ref, dependencies: [ref.current]})
}

export default useAnimateSectionTitle