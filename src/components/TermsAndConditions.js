import { PrismicRichText } from '@prismicio/react'

const TermsAndConditions = ({ slice }) => {
  console.dir(slice, { depth: null })
  const terms = slice.data.slices[0].primary
  console.log(terms)
  return (
    <section id={terms.section_id} className='pt-[12rem] px-[4rem]'>
      <article className='mb-32'>
      <PrismicRichText 
      components={{
        paragraph: ({ children }) => (
          <h1 className="max-w-[65.375rem] text-[4rem] mb-8 font-medium w-full md:leading-[3.625rem]">
            {children}
          </h1>
        )
      }}
      field={terms.title} />
      <PrismicRichText 
      components={{
        heading3: ({ children}) => (
          <p className='max-w-[65.375rem] text-[1.5rem] w-full last:mb-0 opacity-90 md:leading-[3.625rem]'>
           {children}
          </p>
        ),
        paragraph: ({ children }) => (
          <p className="max-w-[65.375rem] w-full last:mb-0 md:leading-[3.625rem] text-[3rem]">
            {children}
          </p>
        )
      }}
      field={terms.description} />

      </article>
      {
        terms.sections.map((section, index) => (
          <div key={`tac-${index}`} className='mb-24'>
            <PrismicRichText
             components={{
              heading3: ({children}) => (
                <p className="mb-8 max-w-[65.375rem] w-full md:leading-[3.625rem] text-[3rem]">
                  {children}
                </p>
              )
             }}
             field={section.title} />
             <ul className='max-w-[65.375rem] w-full '>
              <PrismicRichText 
              components={{
              listItem: ({children}) => (
                <li className="indent-4 text-[2rem]">
                  {children}
                </li>
              ),
              paragraph: ({ children }) => (
                <li className="text-[2rem]">
                  {children}
                </li>
              )
              }}
              field={section.description} />
             </ul>
          </div>
        ))
      }
    </section>
  )
}

export default TermsAndConditions