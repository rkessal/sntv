import About from "@/components/About";
import Contact from "@/components/Contact";
import Influencers from "@/components/Influencers";
import Services from "@/components/Service";

/**
 * @typedef {import("@prismicio/client").Content.SectionSlice} SectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SectionSlice>} SectionProps
 * @param {SectionProps}
 */
const Section = ({ slice }) => {
  const { section_id } = slice.primary
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id={section_id}
      className="mt-32"
    >
      {
        section_id === 'about' && (
          <About slice={slice} />
        )
      }
      {
        section_id === 'services' && (
          <Services slice={slice} />
        )
      }
      {
        section_id === 'talents' && (
          <Influencers slice={slice} />
        )
      }
      {
        section_id === 'contact' && (
          <Contact slice={slice} />
        )
      }
    </section>
  );
};

export default Section;
