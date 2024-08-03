"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import InfluencerDisplay from './InfluencerDisplay'
import { PrismicRichText } from '@prismicio/react'
import Influencer from './Influencer'
import useMousePosition from '@/hooks/useMousePosition'
import gsap from 'gsap'
import useDevice from '@/hooks/useDevice'
import SectionTitle from './SectionTitle'

const Influencers = ({ slice }) => {
  const [isDragging, setDragging] = useState(false);
  const wrapper = useRef(null);
  const frameID = useRef(0);
  const initialMouseX = useRef(0);
  const initialWrapperX = useRef(0);

  const handleMove = useCallback((e) => {
    if (!isDragging) {
      return;
    }

    cancelAnimationFrame(frameID.current);
    frameID.current = requestAnimationFrame(() => {
      const deltaX = e.pageX - initialMouseX.current;
      const newPosX = initialWrapperX.current + deltaX;
     
      if (wrapper.current) {
        wrapper.current.style.transform = `translateX(${newPosX}px)`;
      }
    });
  }, [isDragging]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
    initialMouseX.current = e.pageX;
    if (wrapper.current) {
      const transform = getComputedStyle(wrapper.current).transform;
      const matrix = new DOMMatrix(transform);
      initialWrapperX.current = matrix.m41; // m41 is the X component of the transform matrix
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMove, handleMouseUp]);

  return (
    <>
      <InfluencerDisplay /> 
      <SectionTitle slice={slice} className='px-4 md:px-16' />
      <div 
        ref={wrapper}
        onMouseDown={handleMouseDown}
        className="relative flex sm:flex-row translate-x-[200px]">
        {
          slice.primary.sections.filter(section => section.section.type === 'influencer').map(({ section }) => (
            <Influencer key={section.uid} influencer={section} />
          ))
        }
      </div>
    </>
  )
}

export default Influencers;