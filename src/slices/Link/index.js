import { PrismicNextLink } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.LinkSlice} LinkSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<LinkSlice>} LinkProps
 * @param {LinkProps}
 */
const Link = ({ slice }) => {
  return (
    <PrismicNextLink href={slice.primary.link}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="rounded-[3.75rem] bg-primary px-[2rem] py-[0.75rem] text-secondary uppercase"
    >
      <span className="text-[2rem] md:text-[1.125rem] text-center block min-w-[12.0625rem] w-full">
      {slice.primary.label}
      </span>
    </PrismicNextLink>
  );
};

export default Link;
