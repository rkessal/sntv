import React from 'react'
import ContactForm from './ContactForm'
import SectionTitle from './SectionTitle'

const Contact = ({ slice }) => {
  return (
    <>
      <SectionTitle className='px-4 md:px-16' slice={slice} />
      <ContactForm />
    </>
  )
}

export default Contact