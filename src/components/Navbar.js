"use client"
import { PrismicNextLink } from '@prismicio/next'
import React, { useRef, useState } from 'react'
import Button from './Button'
import clsx from 'clsx'
import useAnimateMenu from '@/animations/useAnimateMenu'

const Navbar = ({ navigation }) => {
  const { slices, slices1 } = navigation.data
  const [ menu, toggleMenu ] = useState(false)

  const container = useRef(null)

  const { contextSafe, animateIn, animateOut } = useAnimateMenu(
    { 
      params: { scope: container.current },
      onStart: () => toggleMenu(true),
      onReverseComplete: () => toggleMenu(false)
    }
  )

  const onMenuClick = contextSafe(() => {
    if (!menu) {
      animateIn()
    } else {
      animateOut()
    }
  })

  return (
    <div ref={container}>
      <nav  className='fixed top-0 z-30 flex flex-row justify-between w-full px-4 mt-4 md:px-16'>
        <Button size='small' onClick={onMenuClick} label='menu' variant='secondary' />
        <Button size='small' link='/#contact' label='prendre rdv' variant='primary' />
      </nav>
      {
        <div data-lenis-prevent className={clsx('fixed z-50 w-screen h-screen px-4 pt-4 menu md:px-16 bg-primary text-secondary', menu ? 'block' : 'hidden')}>
          <Button  size='small' onClick={onMenuClick} label='fermer' variant='primary' />
          <div className='flex mt-16 md:flex-row'>
            <ul className=' md:ml-[25rem] w-full mt-[10vh] md:mt-0 text-[4rem] md:text-start text-center uppercase'>
              {
                slices.map((link, index) => (
                  <li key={`nav-link-1-${index}`}>
                    <PrismicNextLink 
                      onClick={onMenuClick} 
                      target={link.primary.new_tab ? '_blank' : ''} 
                      href={link.primary.link}
                      className='nav-link-1'
                    >
                      { link.primary.label }
                    </PrismicNextLink>
                  </li>
                ))
              }
            </ul>
          </div>
          <ul className='text-[2rem] md:text-[1.125rem] flex flex-row justify-center md:justify-normal md:mt-0 pb-4 mt-32 text-center md:pr-16 md:absolute md:bottom-0 md:right-0'>
            {
              slices1.map((slice, index) => (
                <PrismicNextLink 
                  key={`nav-link-2-${index}`}
                  href={slice.primary.link}
                  className='mr-16 nav-link-2 last:mr-0'
                  target={slice.primary.new_tab ? '_blank' : ''}
                >
                  {slice.primary.label}
                </PrismicNextLink>
              ))
            }
          </ul>
        </div>
        
      }
    </div>
  )
}

export default Navbar