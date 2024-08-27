import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const useAnimateBrands = ({ container }) => {
  let speed = 0.1
  useGSAP(() => {
    gsap.from('.brands__wrapper', {
      scrollTrigger: {
        trigger: container.current,
      },
      yPercent: 100,
      duration: 1.5,
      ease: 'power4.out',
      rotateZ: 8
    })
    const translate = (xPercent) => gsap.set('.brands', {
      xPercent
    })
    let percent = 0
    let raqId
    const animate = () => {
      translate(percent)
      gsap.set('.brands', {
        xPercent: percent
      })
      percent = (percent - speed) % 100;
      raqId = requestAnimationFrame(animate)
    }
    animate()
    return () => {
      cancelAnimationFrame(raqId)
    }
  }, { scope: container})
}

export default useAnimateBrands