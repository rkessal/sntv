"use client"
import SocialNetwork from "@/slices/SocialNetwork"
import { isFilled } from "@prismicio/client"
import { PrismicNextImage } from "@prismicio/next"
import { PrismicRichText } from "@prismicio/react"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Button from "./Button"
import { disableScroll, enableScroll } from "@/app/lib/scroll"

const InfluencerDisplay = ({ influencers }) => {
  const [influencer, setInfluencer] = useState(null)
  const searchParams = useSearchParams()
  const influencerParam = searchParams.get('influencer')
  const influencerImage = useRef(null)

  const jsSearchParams = new URLSearchParams(searchParams)

  const onCloseHandle = () => {
    setInfluencer(null)
    jsSearchParams.delete('influencer')
    window.history.pushState(null, '', `?${jsSearchParams.toString()}`);
  }

  const onNextHandle = () => {
    if (influencer.index === influencers.length - 1) return
    jsSearchParams.set('influencer', influencer.next.section.uid)
    window.history.pushState(null, '', `?${jsSearchParams.toString()}`);
  }

  const onPrevHandle = () => {
    if (influencer.index === 0) return
    jsSearchParams.set('influencer', influencer.prev.section.uid)
    window.history.pushState(null, '', `?${jsSearchParams.toString()}`);
  }

  useEffect(() => {
    enableScroll()
    if (!influencerParam) return

    disableScroll()
    influencers.forEach(({ section }, index) => {
      let next = null
      let prev = null

      if (section.uid === influencerParam) {
        if (index !== influencers.length - 1) {
          next = influencers[index + 1]
        }
        if (index !== 0) {
          prev = influencers[index - 1]
        }
        setInfluencer({index, next, prev, ...section.data})
      }
    })
    return () => setInfluencer(null)
  }, [influencerParam, influencers])

  return influencerParam && (
    <article data-lenis-prevent className="fixed top-0 bottom-0 left-0 z-40 w-full px-4 py-16 overflow-y-scroll md:px-16 bg-secondary">
      {
        influencer && 
          <div ref={influencerImage} className="relative flex flex-col w-full md:flex-row">
            {
              isFilled.image(influencer.image) 
                && (
                  <div className="mt-24 md:mt-0 shrink-0 md:w-[40.375rem] md:pr-[8.3125rem] h-[60rem] md:h-[41.5625rem]">
                    <figure className="relative w-full h-full color-overlay texture-overlay ">
                      <PrismicNextImage alt="" className="object-cover w-full h-full" field={influencer.image} />
                    </figure>
                  </div>
                )
            }
            <div className="flex flex-col w-full mt-8">
              <h1 className="text-[3rem] mb-8 font-bold">{influencer.name}</h1>
              <PrismicRichText field={influencer.description} />
              <div className="grid grid-cols-[1fr_17rem] mt-16">
                {
                  influencer.slices?.map(slice => <SocialNetwork key={slice.id} slice={slice} />)
                }
              </div>
              <div className="flex mt-8 ml-auto md:mt-auto">
                <Button className='mr-4' variant='secondary' label='precedent' onClick={onPrevHandle}/>
                <Button variant='secondary' label='suivant' onClick={onNextHandle}/>
              </div>
            </div>
            <Button variant='secondary' label='fermer' onClick={onCloseHandle} className='absolute top-0 right-0' />
          </div>
        
      }
    </article>
  )
}

export default InfluencerDisplay