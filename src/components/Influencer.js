"use client"
import { isFilled } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import React from 'react'

const Influencer = ({influencer}) => {
  const { uid } = influencer

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('influencer', uid)
    window.history.pushState(null, '', `?${currentParams.toString()}`);
  }

  return (
    <article
      className='w-full mr-20' 
      onClick={(e) => handleClick(e)} 
    >
      {
        isFilled.image(influencer.data.image) 
          && (
            <figure className="w-[23.75rem] h-[32rem] relative texture-overlay color-overlay">
              <PrismicNextImage alt='' className="object-cover w-full h-full pointer-events-none " field={influencer.data.image} />
            </figure>
          )
      }
      <h2 className='pointer-events-none mt-8 text-[1.125rem]'>{influencer.data.name}</h2>
    </article>
  );
}

export default Influencer