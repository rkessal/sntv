'use client'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import clsx from 'clsx'
import { useSearchParams } from 'next/navigation'
import React, { memo, useEffect, useRef } from 'react'
import SectionTitle from './SectionTitle'

const Services = ({slice}) => {
  const searchParams = useSearchParams();
  const currentService = searchParams.get('service')
  const firstCerviceRef = useRef(null)

  const setFirstService = (ref) => {
    firstCerviceRef.current = ref.current
  }

  useGSAP(() => {
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
    }, '<')
  }, {dependencies: [currentService]})

  return (
    <>
      <SectionTitle slice={slice} className='px-4 md:px-16' />
      {
        slice.primary.sections.map((s, index) => (
          <Service key={`${s.uid}-${index}`} index={index} slice={s.section} currentService={currentService} setFirstService={setFirstService} firstCerviceRef={firstCerviceRef} />
        ))
      }
      <div className="h-[0.375rem] w-full bg-primary mb-4"></div>
    </>
  )
 
}

const Service = ({slice, currentService, index, setFirstService, firstCerviceRef}) => {
  const { uid } = slice
  const ref = useRef(null)

  useEffect(() => {
    if (index === 0) setFirstService(ref)
  }, [])
  
  const handleLinkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('service', uid)
    window.history.pushState(null, '', `?${currentParams.toString()}`);

    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const remInPixels = rootFontSize * 5;

    gsap.to(window, {
      scrollTo: {
        y: firstCerviceRef.current,
        offsetY: index * remInPixels * -1
      },
      duration: 1,
      ease: 'power4.inOut'
    })
  }

  return (
      <article ref={ref} className={clsx(
        "h-[5rem] overflow-hidden service", 
        (!currentService && index === 0) && 'active',
        currentService === uid && 'active'
      )}>
        <div className="h-[0.375rem] w-full bg-primary mb-4"></div>
        <div className="px-4 md:px-16">
          <h1 onClick={(e) => handleLinkClick(e)} className="hover:cursor-pointer text-[3rem] font-bold md:text-[4rem] mb-8 md:mb-16 uppercase">{slice.data.title}</h1>
          <div className="flex flex-col mb-8 md:flex-row">
            <div className="flex flex-col w-full md:max-w-[41.625rem] pr-[1.125rem]">
              <PrismicRichText components={{
                paragraph: ({children}) => <p data-animate-paragraph className="text-[2rem] md:text-[1.125rem] mb-4">{children}</p>
              }} field={slice.data.description} />
              <PrismicRichText components={{
                paragraph: ({children}) => <p data-animate-paragraph className="text-[2rem] md:text-[1.125rem]">{children}</p>
              }}
              field={slice.data.benefit} />
            </div>
            {
              isFilled.image(slice.data.image) 
                && (
                  <figure className="md:w-[40.375rem] mt-8 md:mt-0 h-[21.375rem]">
                    <PrismicNextImage alt="" className="object-cover w-full h-full" field={slice.data.image} />
                  </figure>
                )
            }
          </div>
      </div>
      </article>
  )
}

export default Services