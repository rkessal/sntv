"use client"
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import SplitType from 'split-type';

const useSplitType = (scope, selector, options = {}) => {
  const splitInstance = useRef(null);

  useGSAP(() => {
    const handleResize = () => {
      if (splitInstance.current) {
        splitInstance.current.revert();
      } 
      splitInstance.current = new SplitType(selector, options);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  })

  return { getSplit: () => splitInstance.current };
};

export default useSplitType;
