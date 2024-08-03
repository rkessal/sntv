import { disableScroll, enableScroll } from '@/app/lib/scroll'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

const useAnimateMenu = ({ params, onStart, onReverseComplete }) => {
  const tl = useRef(
    gsap.timeline({
      onStart,
      onReverseComplete,
      paused: true,
    })
  )

  const animateIn = () => {
    disableScroll()
    tl.current.play()
  }

  const animateOut = () => {
    enableScroll()
    tl.current.reverse()    
  }

  const { contextSafe, context } = useGSAP(() => {
    gsap.set('.menu', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        autoAlpha: 1
      })
    gsap.set(['.nav-link-1', '.nav-link-2'], {
      autoAlpha: 0
    })

    tl.current.to('.menu', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1.5,
      ease: 'expo.inOut',
    }).to(['.nav-link-1', '.nav-link-2'], {
      autoAlpha: 1,
      stagger: 0.07,
    }, '<=+1')
  }, params)
  
  return { contextSafe, animateIn, animateOut, tl }
}

export default useAnimateMenu