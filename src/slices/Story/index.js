/**
 * @typedef {import("@prismicio/client").Content.StorySlice} StorySlice
 * @typedef {import("@prismicio/react").SliceComponentProps<StorySlice>} StoryProps
 * @param {StoryProps}
 */
const Story = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for story (variation: {slice.variation}) Slices
    </section>
  );
};

export default Story;
