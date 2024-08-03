"use client"
import { createClient } from "@/prismicio"
import SocialNetwork from "@/slices/SocialNetwork"
import { isFilled } from "@prismicio/client"
import { PrismicNextImage } from "@prismicio/next"
import { PrismicRichText } from "@prismicio/react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Button from "./Button"

const InfluencerDisplay = () => {
  const [influencer, setInfluencer] = useState(null)
  const searchParams = useSearchParams()
  const influencerParam = searchParams.get('influencer')

  const jsSearchParams = new URLSearchParams(searchParams)

  const onCloseHandle = () => {
    setInfluencer(null)
    jsSearchParams.delete('influencer')
    window.history.pushState(null, '', `?${jsSearchParams.toString()}`);
  }

  const client = createClient()

  useEffect(() => {
    document.body.classList.remove('overflow-y-hidden')
    if (!influencerParam) return

    document.body.classList.add('overflow-y-hidden')
    client.getByUID('influencer', influencerParam)
      .then(res => setInfluencer(res.data))
  }, [influencerParam])

  return influencerParam && (
    <article data-lenis-prevent className="fixed top-0 bottom-0 left-0 z-40 w-full px-4 py-16 overflow-y-scroll md:px-16 bg-secondary">
      {
        influencer && (
          <div className="relative flex flex-col w-full md:flex-row">
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
            <div className="md:max-w-[26.25rem] w-full mt-8">
              <h1 className="text-[3rem] mb-8 font-bold">{influencer.name}</h1>
              <PrismicRichText field={influencer.description} />
              <div className="grid grid-cols-2 mt-16">
                {
                  influencer.slices.map(slice => <SocialNetwork slice={slice} />)
                }
              </div>
            </div>
            <Button variant='secondary' label='fermer' onClick={onCloseHandle} className='absolute top-0 right-0' />
          </div>
        )
      }
    </article>
  )
}

export default InfluencerDisplay