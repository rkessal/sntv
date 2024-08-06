import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'
import gsap from 'gsap/all'

const useAnimateContact = ({ scope }) => {
  useGSAP(() => {
    const inputs = gsap.utils.toArray('.contact-input')
    const labels = gsap.utils.toArray('.contact-label')
    gsap.set(inputs, {
      transformOrigin: 'left',
      autoAlpha: 0,
      scaleX: 0
    })
    gsap.set(labels, {
      autoAlpha: 0
    })
    ScrollTrigger.batch(inputs, {
      start: "+=20% bottom",
      onEnter: (batch) => {
        gsap.to(batch, {
          scaleX: 1,
          autoAlpha: 1,
          duration: 0.5,
          stagger: .1,
          ease: 'out',
        })
      }
    })
    ScrollTrigger.batch(labels, {
      start: "+=20% bottom",
      onEnter: (batch) => {
        gsap.to(batch, {
          autoAlpha: 1,
          stagger: .1,
        })
      }
    })
  }, { scope })
}

export default useAnimateContact