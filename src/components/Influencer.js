"use client";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { forwardRef, useEffect, useRef } from "react";

const Influencer = forwardRef(({ influencer, onClick }, ref) => {
  const { uid } = influencer;
  const influencerRef = useRef(null);

  useEffect(() => {
    ref.current = influencerRef.current;
  }, [ref, influencerRef]);

  return (
    <article
      className="w-full mr-20"
      onClick={(e) => onClick(e, uid)}
      ref={influencerRef}
    >
      {isFilled.image(influencer.data.image) && (
        <figure
          data-influencer={uid}
          data-img-src={influencer.data.image.url}
          className="md:opacity-0 z-10 w-[23.75rem] h-[32rem] relative texture-overlay color-overlay"
        >
          <PrismicNextImage
            alt=""
            className="object-cover w-full h-full pointer-events-none "
            field={influencer.data.image}
          />
        </figure>
      )}
      <h2 className="pointer-events-none mt-8 text-[1.125rem]">
        {influencer.data.name}
      </h2>
    </article>
  );
});

Influencer.displayName = "Influencer";
export default Influencer;
