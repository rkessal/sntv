"use client"
import { useRef } from 'react'
import InfluencerDisplay from './InfluencerDisplay'
import Influencer from './Influencer'
import SectionTitle from './SectionTitle'
import { useGSAP } from '@gsap/react'
import { Draggable } from 'gsap/Draggable'

const Influencers = ({ slice }) => {
  const wrapper = useRef(null);
  const container = useRef(null)

  const influencers = slice.primary.sections.filter(section => section.section.type === 'influencer')

  useGSAP(() => {
    Draggable.create(wrapper.current, {
      type: 'x',
      bounds: '.influencer-list-container'
    })
  })

  return (
    <>
      <InfluencerDisplay influencers={influencers} /> 
      <SectionTitle slice={slice} className='px-4 md:px-16' />
      <div className='overflow-hidden influencer-list-container' ref={container}>
        <div 
          ref={wrapper}
          className="inline-flex sm:flex-row">
          {
            influencers.map(({ section }) => (
              <Influencer key={section.uid} influencer={section} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Influencers;