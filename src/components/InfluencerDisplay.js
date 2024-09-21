"use client";
import SocialNetwork from "@/slices/SocialNetwork";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { useSearchParams } from "next/navigation";
import { forwardRef, useEffect, useRef, useState } from "react";
import Button from "./Button";
import { disableScroll, enableScroll } from "@/app/lib/scroll";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import clsx from "clsx";

const InfluencerDisplay = forwardRef(({ influencers }, imageRef) => {
  const [influencer, setInfluencer] = useState(null);
  const searchParams = useSearchParams();
  const influencerParam = searchParams.get("influencer");
  const influencerImage = useRef(null);

  const [loading, setLoading] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const $image = useRef();

  const jsSearchParams = new URLSearchParams(searchParams);

  const { contextSafe } = useGSAP(
    () => {
      console.log(hasOpened);
      if (!influencerParam)
        return () => {
          gsap.set(".influencer__wrapper", {
            autoAlpha: 1,
          });
        };
      if (hasOpened) return;
      const tl = gsap.timeline({
        delay: 0.2,
      });
      gsap.set(".influencer__wrapper", {
        autoAlpha: 0,
      });
      tl.from(".influencer__container", {
        autoAlpha: 0,
        duration: 0.5,
      }).to(".influencer__wrapper", {
        delay: 1.5,
        autoAlpha: 1,
      });
      tl.eventCallback("onComplete", () => setHasOpened(true));
    },
    { dependencies: [influencerParam] },
  );

  const closeAnimation = contextSafe(() => {
    return new Promise((resolve) => {
      const tl = gsap.timeline();
      tl.to(".influencer__container", {
        scrollTo: {
          y: 0,
          ease: "power4.inOut",
          duration: 0.2,
        },
      }).to(".influencer__container", {
        yPercent: 100,
        onComplete: resolve,
        duration: 1.5,
        ease: "power4.inOut",
      });
    });
  });

  const resetAnimation = contextSafe(() => {
    gsap.set(".influencer__container", {
      delay: 0.5,
      yPercent: 0,
    });
  });

  const onCloseHandler = async () => {
    await closeAnimation();
    setHasOpened(false);
    setInfluencer(null);
    jsSearchParams.delete("influencer");
    window.history.pushState(null, "", `?${jsSearchParams.toString()}`);
    resetAnimation();
  };

  const onNextHandler = async () => {
    if (influencer.index === influencers.length - 1) return;
    await transition(".influencer__next_image", -1);
    jsSearchParams.set("influencer", influencer.next.section.uid);
    window.history.pushState(null, "", `?${jsSearchParams.toString()}`);
  };

  const onPrevHandler = async () => {
    if (influencer.index === 0) return;
    await transition(".influencer__prev_image", 1);
    jsSearchParams.set("influencer", influencer.prev.section.uid);
    window.history.pushState(null, "", `?${jsSearchParams.toString()}`);
  };

  const transition = contextSafe((target, dir) => {
    setLoading(true);
    return new Promise((resolve) => {
      gsap.to(".influencer__info", {
        autoAlpha: 0,
        duration: 1,
        ease: "power4.out",
      });
      gsap.set(target, {
        zIndex: 999,
        scale: 1.3,
      });
      gsap.to(target, {
        xPercent: 100 * dir,
        duration: 1,
        scale: 1,
        ease: "power4.out",
        onComplete: () => {
          setLoading(false);
          resolve();
        },
      });
    });
  });

  useEffect(() => {
    imageRef.current = $image.current;
    if (!influencerParam) return;

    disableScroll();
    influencers.forEach(({ section }, index) => {
      let next = null;
      let prev = null;

      if (section.uid === influencerParam) {
        if (index !== influencers.length - 1) {
          next = influencers[index + 1];
        }
        if (index !== 0) {
          prev = influencers[index - 1];
        }
        setInfluencer({ index, next, prev, ...section.data });
      }
    });

    return () => {
      enableScroll();
      setInfluencer(null);
    };
  }, [influencerParam, influencers]);

  return (
    influencerParam && (
      <div
        data-lenis-prevent
        className="fixed top-0 overflow-y-scroll bottom-0 left-0 z-[55]  w-screen h-screen influencer__container bg-secondary"
      >
        <article className="px-4 py-16 w-full  md:px-16 bg-secondary influencer__wrapper">
          <div
            ref={influencerImage}
            key={`influencer-${influencerParam}`}
            className={clsx(
              "relative flex flex-col w-full influencer md:flex-row",
              !influencer && "opacity-0",
            )}
          >
            <div className="mt-24 md:mt-0 shrink-0 md:w-[40.375rem] md:pr-[8.3125rem] h-[60rem] md:h-[41.5625rem]">
              <figure
                ref={$image}
                data-influencer-display-image
                className="relative flex flex-row w-full h-full overflow-hidden color-overlay texture-overlay"
              >
                {isFilled.image(influencer?.image) && (
                  <>
                    <PrismicNextImage
                      alt=""
                      className="absolute top-0 left-0 object-cover w-full h-full -translate-x-full influencer__prev_image"
                      field={influencer?.prev?.section.data.image}
                    />
                    <PrismicNextImage
                      alt=""
                      className="absolute top-0 left-0 object-cover w-full h-full"
                      field={influencer?.image}
                    />
                    <PrismicNextImage
                      alt=""
                      className="absolute top-0 left-0 object-cover w-full h-full translate-x-full influencer__next_image"
                      field={influencer?.next?.section.data.image}
                    />
                  </>
                )}
              </figure>
            </div>
            <div className="flex flex-col w-full mt-8">
              <div className="influencer__info">
                <h1 className="flex flex-col text-[3rem] mb-8 font-bold">
                  {influencer?.name}
                </h1>
                <PrismicRichText field={influencer?.description} />
                <div className="grid grid-cols-[1fr_17rem] mt-16">
                  {influencer?.slices?.map((slice) => (
                    <SocialNetwork key={slice.id} slice={slice} />
                  ))}
                </div>
              </div>
              <div className="flex mt-8 ml-auto md:mt-auto">
                <Button
                  disabled={loading || !influencer?.prev}
                  className="mr-4"
                  variant="secondary"
                  label="precedent"
                  onClick={onPrevHandler}
                />
                <Button
                  disabled={loading || !influencer?.next}
                  variant="secondary"
                  label="suivant"
                  onClick={onNextHandler}
                />
              </div>
            </div>
            <Button
              variant="secondary"
              label="fermer"
              onClick={onCloseHandler}
              className="absolute top-0 right-0"
            />
          </div>
        </article>
      </div>
    )
  );
});

InfluencerDisplay.displayName = "InfluencerDisplay";
export default InfluencerDisplay;
