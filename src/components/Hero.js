import Link from '@/slices/Link'
import { PrismicRichText } from '@prismicio/react'
import Brands from './Brands'

const Hero = ({ home, brands }) => {
  return (
      <section id="back-to-top" className="flex flex-col w-full h-[80vh] md:h-auto md:pt-[8rem]">
        <div className='flex flex-col items-center justify-center px-4 md:px-16'>
          <PrismicRichText
            components={{
              paragraph: ({children}) => 
              <p 
                className="font-serif mb-[1.25rem] mt-64 md:mt-0 leading-[11rem] text-[14rem] md:leading-[21.125rem] font-medium md:text-[24.8125rem] text-primary uppercase max-w-[45rem] md:max-w-[80rem] w-full text-center"
              >
                    {children}
                </p>
            }} 
            field={home.data.hero.data.title} />
          <PrismicRichText 
            components={{
              paragraph: ({children}) => 
                <p 
                  className="mb-[2.5rem] text-[2rem] md:text-[1.125rem] text-primary md:max-w-[38.625rem] w-full text-center"
                >
                    {children}
                </p>
            }} 
            field={home.data.hero.data.subtitle}
          />
          <Link
            slice={home.data.hero.data.slices[0]} 
            slices={home.data.hero.data.slices} 
            index={0}
          />
        </div>
        <Brands brands={brands} />
      </section>
  )
}

export default Hero