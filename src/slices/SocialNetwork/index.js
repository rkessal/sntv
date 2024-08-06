import { PrismicNextLink } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.SocialNetworkSlice} SocialNetworkSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SocialNetworkSlice>} SocialNetworkProps
 * @param {SocialNetworkProps}
 */
const SocialNetwork = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicNextLink target="_blank" href={slice.primary.link}>
        <span className="block text-[3rem] font-bold">
          {
            slice.primary.label
          }
        </span>
      </PrismicNextLink>
      <p className="font-medium leading-none text-[3.5rem]">{slice.primary.number}</p>
    </section>
  );
};

export default SocialNetwork;
