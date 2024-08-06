"use client"
import useAnimateSectionTitle from '@/animations/useAnimateSectionTitle'
import { PrismicRichText } from '@prismicio/react'
import clsx from 'clsx'
import { memo, useRef } from 'react'

const SectionTitle = ({ slice, className }) => {
  const titleRef = useRef(null)
  useAnimateSectionTitle({ ref: titleRef })

  return (
    <PrismicRichText
      components={{
        paragraph: ({children}) => (
          <p 
            ref={titleRef} 
            className={clsx(
              'mb-8 uppercase font-serif tracking-tight md:leading-[14.125rem] md:text-[24.8125rem]',
              className
            )}
          >
            {children}
          </p>
        )
      }}
      field={slice.primary.description} 
    />
  )
}

export default memo(SectionTitle)