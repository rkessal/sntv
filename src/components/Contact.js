import { PrismicRichText } from '@prismicio/react'
import React from 'react'
import ContactForm from './ContactForm'

const Contact = ({ slice }) => {
  return (
    <>
      <PrismicRichText
        components={{
          paragraph: ({children}) => <p 
            className="px-4 md:px-16 max-w-[65.375rem] w-full mb-16 last:mb-0 md:leading-[3.625rem] text-[3rem]"
          >
            {children}
          </p>
        }}
        field={slice.primary.description} 
      />
      <ContactForm />
    </>
  )
}

export default Contact