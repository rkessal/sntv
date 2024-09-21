"use client";
import { useLoading } from "@/app/store/loading-scene";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { disableScroll, enableScroll } from "@/app/lib/scroll";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const Preloader = () => {
  const { state } = useLoading();
  const [animationData, setAnimationData] = useState(null);
  const [complete, setComplete] = useState(false);
  const [destroy, setDestroy] = useState(false);
  const { currentProgress } = state;

  const containerRef = useRef(null);
  const lottieRef = useRef(null);

  useEffect(() => {
    disableScroll();
    const fetchLottieData = async () => {
      const response = await fetch("/lottie/sntv-logo.json");
      const data = await response.json();
      setAnimationData(data);
    };

    fetchLottieData();
  }, []);

  const onComplete = () => {
    enableScroll();
    setDestroy(true);
  };

  useGSAP(
    () => {
      if (complete) {
        gsap.set(containerRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        });
        gsap.to(containerRef.current, {
          delay: 0.4,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.5,
          ease: "expo.out",
          onComplete: () => onComplete(),
        });
      }
    },
    { dependencies: [complete, currentProgress, lottieRef.current] },
  );

  return (
    !destroy && (
      <div
        data-lenis-prevent
        ref={containerRef}
        className="text-secondary h-screen w-screen bg-primary flex justify-center items-center z-[99] fixed top-0 left-0"
      >
        <div className="w-[60vw] h-full flex flex-col items-center">
          <div className="relative w-full h-full">
            <Image
              className="absolute top-0 left-0 w-full h-full"
              src="/lottie/outline-beige.svg"
              width={1920}
              height={1080}
              loading="eager"
              alt=""
            />
            {animationData && !(currentProgress < 100) && (
              <Lottie
                className="absolute top-0 left-0 w-full h-full"
                ref={lottieRef}
                onComplete={() => setComplete(true)}
                animationData={animationData}
                loop={false}
              />
            )}
          </div>
          <div className="font-serif preloader__loading_text text-[10rem] -mt-8">
            {Math.round(currentProgress)}
          </div>
        </div>
      </div>
    )
  );
};

export default Preloader;
