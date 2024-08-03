/**
 * @typedef {import("@prismicio/client").Content.ServiceSlice} ServiceSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ServiceSlice>} ServiceProps
 * @param {ServiceProps}
 */
const Service = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for service (variation: {slice.variation}) Slices
    </section>
  );
};

export default Service;
