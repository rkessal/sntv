/**
 * @typedef {import("@prismicio/client").Content.BrandSlice} BrandSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BrandSlice>} BrandProps
 * @param {BrandProps}
 */
const Brand = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for brand (variation: {slice.variation}) Slices
    </section>
  );
};

export default Brand;
