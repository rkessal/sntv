"use client"
import initGSAP from '@/app/lib/gsap'
import initLenis from '@/app/lib/lenis'
import { useGSAP } from '@gsap/react'
import { useEffect } from 'react'

const Setup = () => {
  useGSAP(() => {
    if (typeof window !== 'undefined') {
      initLenis()
      initGSAP()
    }
  },)
  return null
}

export default Setup