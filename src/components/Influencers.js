"use client";
import { Canvas } from "@react-three/fiber";
import { createRef, useRef, useState } from "react";
import Influencer from "./Influencer";
import InfluencerDisplay from "./InfluencerDisplay";
import Scene from "./Scene";
import SectionTitle from "./SectionTitle";
import Transition from "./Transition";
import { LoadingProvider } from "@/app/store/loading-scene";

const Influencers = ({ slice }) => {
  const wrapper = useRef(null);
  const container = useRef(null);
  const $imageRef = useRef(null);
  const image = useRef({ position: [], scale: [] });
  const $transitionWrapper = useRef();

  const [clone, setClone] = useState(null);
  const [canvasOffset, setCanvasOffset] = useState(null);

  const influencers = slice.primary.sections.filter(
    (section) => section.section.type === "influencer",
  );
  const influencerRefs = influencers.map((_) => createRef(null));

  const onClickHandler = async (e, uid) => {
    e.preventDefault();
    e.stopPropagation();

    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("influencer", uid);
    window.history.pushState(null, "", `?${currentParams.toString()}`);
  };

  return (
    <div className="relative w-full">
      <InfluencerDisplay ref={$imageRef} influencers={influencers} />
      <SectionTitle slice={slice} className="px-4 md:px-16" />
      {!!clone && (
        <div
          ref={$transitionWrapper}
          className="fixed top-0 left-0 z-[56] w-screen h-screen pointer-events-none"
        >
          <Canvas eventSource={$transitionWrapper.current}>
            <Transition
              image={image}
              canvasOffset={canvasOffset}
              setClone={setClone}
              clone={clone}
            />
          </Canvas>
        </div>
      )}
      <div
        className="relative w-full overflow-x-hidden influencer-list-container"
        ref={container}
      >
        <div className="absolute top-0 left-0 z-50 w-screen h-screen pointer-events-none">
          <Canvas>
            <Scene
              clone={clone}
              setCanvasOffset={setCanvasOffset}
              image={image}
              setClone={setClone}
              imageRef={$imageRef}
              ref={wrapper}
            />
          </Canvas>
        </div>
        <div ref={wrapper} className="relative z-40 inline-flex sm:flex-row">
          {influencers.map(({ section }, index) => (
            <Influencer
              onClick={onClickHandler}
              key={section.uid}
              ref={influencerRefs[index]}
              influencer={section}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Influencers;
