"use client"
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.InfluencerSlice} InfluencerSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<InfluencerSlice>} InfluencerProps
 * @param {InfluencerProps}
 */
const Influencer = ({ slice }) => {
  const { uid } = slice.primary.influencer

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('influencer', uid)
    window.history.pushState(null, '', `?${currentParams.toString()}`);
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className='mr-20'
      onClick={(e) => handleClick(e)} 
    >
      {
        isFilled.image(slice.primary.influencer.data.image) 
          && (
            <figure className="md:w-[23.75rem] h-[32rem] relative texture-overlay color-overlay">
              <PrismicNextImage alt="" className="object-cover w-full h-full" field={slice.primary.influencer.data.image} />
            </figure>
          )
      }
      <h2 className='mt-8 text-[1.125rem]'>{slice.primary.influencer.data.name}</h2>
    </section>
  );
};

export default Influencer;
