"use client"
import useAnimateAbout from '@/animations/useAnimateAbout'
import { PrismicRichText } from '@prismicio/react'
import clsx from 'clsx'
import React, { useRef } from 'react'
import SectionTitle from './SectionTitle'

const About = ({ slice }) => {
  const refContainer = useRef(null)
  useAnimateAbout({ container: refContainer})

  return (
    <section ref={refContainer} id={slice.primary.section_id} className="w-full px-4 mt-32 md:px-16">
      <SectionTitle slice={slice} />
      {
        slice.primary.sections.map((slice, index) => (
          <PrismicRichText
            key={`${slice.id}-${index}`}
            components={{
              paragraph: ({children}) => 
              <div className={clsx(
                'flex items-center mb-16 p-about md:py-64',
                index === 0 && 'md:pt-0'
                )}>
                <p 
                  className="origin-bottom-left max-w-[65.375rem] w-full last:mb-0 md:leading-[3.625rem] text-[3rem]"
                >
                  {children}
                </p>
              </div>
            }}
            field={slice.description} 
          />
        ))
      }
    </section>
  )
}

export default About