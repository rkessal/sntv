'use client'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import clsx from 'clsx'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import SectionTitle from './SectionTitle'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Services = ({slice}) => {
  const searchParams = useSearchParams()
  const refContainer = useRef(null)
  const currentService = searchParams.get('service')
  const firstServiceRef = useRef(null)

  const setFirstService = (ref) => {
    firstServiceRef.current = ref.current
  }

  const { contextSafe } = useGSAP(() => {
    const tl = gsap.timeline()
    tl.to('.service', {
      height: '5rem',
      duration: 1.0,
      ease: 'power4.inOut'
    })
    tl.to('.active', {
      height: 'auto',
      duration: 1.0,
      ease: 'power4.inOut',
      onComplete: () => ScrollTrigger.getAll().forEach(st => st.refresh())
    }, '<')
  }, {scope: refContainer, dependencies: [ currentService ]})

  return (
    <div ref={refContainer}>
      <SectionTitle slice={slice} className='px-4 md:px-16' />
      {
        slice.primary.sections.map((s, index) => (
          <Service 
            key={`${s.uid}-${index}`} 
            index={index} 
            slice={s.section} 
            currentService={currentService} 
            setFirstService={setFirstService} 
            firstServiceRef={firstServiceRef} 
            contextSafe={contextSafe}
          />
        ))
      }
      <div className="h-[0.25rem] w-full bg-primary mb-4"></div>
    </div>
  )
 
}

const Service = ({
  slice, 
  currentService,
  index, 
  setFirstService, 
  firstServiceRef,
  contextSafe
}) => {
  const { uid } = slice
  const ref = useRef(null)

  useEffect(() => {
    if (index === 0) setFirstService(ref)
  }, [index, setFirstService])
  
  const handleLinkClick = contextSafe((e) => {
    e.preventDefault();
    e.stopPropagation();

    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('service', uid)
    window.history.pushState(null, '', `?${currentParams.toString()}`);

    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const remInPixels = rootFontSize * 5;

    gsap.to(window, {
      scrollTo: {
        y: firstServiceRef.current,
        offsetY: index * remInPixels * -1 + 64
      },
      duration: 1,
      ease: 'power4.inOut'
    })
  })

  return (
      <article ref={ref} className={clsx(
        "h-[5rem] overflow-hidden service", 
        currentService === uid && 'active'
      )}>
        <div className="h-[0.25rem] w-full bg-primary"></div>
        <div className="px-4 md:px-16">
          <h1 onClick={(e) => handleLinkClick(e)} className="hover:cursor-pointer mt-2 md:-mt-4 text-[3rem] md:text-[8.0625rem] font-black italic mb-8 md:mb-16 uppercase">{slice.data.title}</h1>
          <div className="flex flex-col mb-8 md:flex-row">
            {
              isFilled.image(slice.data.image) 
                && (
                  <div className='md:w-[41.625rem] md:mt-0 h-[27rem]'>
                    <figure className="relative w-full h-full color-overlay texture-overlay ">
                      <PrismicNextImage alt="" className="object-cover w-full h-full" field={slice.data.image} />
                    </figure>
                  </div>
                )
            }
            <div className="flex flex-col w-full md:max-w-[33.3125rem] mt-16 md:mt-0 md:ml-[7.0625rem]">
              <PrismicRichText components={{
                heading1: ({children}) => <h1 className="text-[2rem] font-bold italic mb-4">{children}</h1>,
                paragraph: ({children}) => <p className="text-[2rem] md:text-[1.125rem] mb-8">{children}</p>
              }} field={slice.data.description} />
              <PrismicRichText components={{
                heading1: ({children}) => <h1 className="text-[2rem] font-bold italic mb-4">{children}</h1>,
                paragraph: ({children}) => <p className="text-[2rem] md:text-[1.125rem]">{children}</p>
              }}
              field={slice.data.benefit} />
            </div>
          </div>
      </div>
      </article>
  )
}

export default Services