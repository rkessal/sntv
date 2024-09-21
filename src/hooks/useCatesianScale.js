import { gsap } from "gsap";

const useCartesianScale = (viewport, size) => {
  const screenWidth = size.width;
  const screenHeight = size.height;

  const getScale = ({ width, height }) => {
    const scaleX = gsap.utils.mapRange(
      0,
      screenWidth,
      0,
      viewport.width,
      width,
    );
    const scaleY = gsap.utils.mapRange(
      0,
      screenHeight,
      0,
      viewport.height,
      height,
    );

    return { scaleX, scaleY };
  };

  return {
    getScale,
  };
};

export default useCartesianScale;
