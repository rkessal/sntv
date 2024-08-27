'use client'
import useAnimateBrands from '@/animations/useAnimateBrands'
import { PrismicNextImage } from '@prismicio/next'
import React, { useRef } from 'react'

const Brands = ({ brands }) => {
  const container = useRef(null)
  useAnimateBrands({ container })

  return (
    <div 
      ref={container}
      className="relative flex flex-row w-full mt-32 overflow-clip"
    >
      <div className='flex flex-row w-full origin-top-left brands__wrapper'>
        <div className="flex flex-row brands shrink-0">
          {
            brands.data.slices.map(slice => (
              <figure key={slice.id} className="h-[4.5rem] w-auto mr-32 shrink-0">
                <PrismicNextImage alt="" className="object-contain w-full h-full" field={slice.primary.image} />
              </figure>
            ))
          }
        </div>
        <div className="flex flex-row brands shrink-0">
          {
            brands.data.slices.map(slice => (
              <figure key={slice.id} className="h-[4.5rem] w-auto mr-32 shrink-0">
                <PrismicNextImage alt="" className="object-contain w-full h-full" field={slice.primary.image} />
              </figure>
            ))
          }
        </div>
      </div>
    </div>

  )
}

export default Brands