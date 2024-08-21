import useDevice from '@/hooks/useDevice'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import SplitType from 'split-type'

const useAnimateSectionTitle = ({ ref }) => {
  const { isMobile } = useDevice()
  useGSAP(() => {
    const split =  new SplitType(ref.current, {
      split: 'chars',
      charClass: 'title-char',
      tagName: 'span'
    })

    if (isMobile) return

    gsap.set(ref.current, {
      overflowY: 'hidden'
    })

    gsap.set(split.chars, {
      verticalAlign: 'text-bottom',
      transformOrigin: 'bottom',
    })

    gsap.from(split.chars, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top center",
      },
      rotationZ: 7,
      duration: 1,
      yPercent: 140,
      ease: 'power4.out',
      stagger: 0.08,
    })
  }, { dependencies: [ref.current, isMobile]})
}

export default useAnimateSectionTitle