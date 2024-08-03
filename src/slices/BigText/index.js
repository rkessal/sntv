/**
 * @typedef {import("@prismicio/client").Content.BigTextSlice} BigTextSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BigTextSlice>} BigTextProps
 * @param {BigTextProps}
 */
const BigText = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for big_text (variation: {slice.variation}) Slices
    </section>
  );
};

export default BigText;
