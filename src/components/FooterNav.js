import { PrismicNextLink } from "@prismicio/next"
import { PrismicRichText } from "@prismicio/react"

const FooterNav = ({slices, location}) => {
  return (
    <ul className="md:w-[10.5rem] mb-16 md:mb-0">
    {
      slices.map(slice => (
        <li key={slice.id} className="mb-6 last:mb-0">
          <PrismicNextLink target={slice.primary.new_tab ? '_blank': undefined} href={slice.primary.link}>
            <span>
              {slice.primary.label}
            </span>
          </PrismicNextLink>
        </li>
      ))
    }
    {
      <li>
        <PrismicRichText field={location} />
      </li>
    }
    </ul>
  )
}

export default FooterNav