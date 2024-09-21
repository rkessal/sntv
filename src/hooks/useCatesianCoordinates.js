import { useThree } from "@react-three/fiber";
import { gsap } from "gsap";

const useCartesianCoordinates = (viewport, size) => {
  const screenWidth = size.width;
  const screenHeight = size.height;

  const getCartesianY = ({ y, height }) => {
    return gsap.utils.mapRange(
      0,
      screenHeight,
      viewport.height / 2,
      -viewport.height / 2,
      y + height / 2,
    );
  };
  const getCartesianX = ({ x, width }) => {
    return gsap.utils.mapRange(
      0,
      screenWidth,
      -viewport.width / 2,
      viewport.width / 2,
      x + width / 2,
    );
  };

  const getCartesianCoordinates = (
    { x, y, height, width },
    dragDistance = 0,
  ) => {
    const cartesianX =
      gsap.utils.mapRange(
        0,
        screenWidth,
        -viewport.width / 2,
        viewport.width / 2,
        x + width / 2,
      ) + dragDistance;
    const cartesianY = gsap.utils.mapRange(
      0,
      screenHeight,
      viewport.height / 2,
      -viewport.height / 2,
      y - size.top + height / 2,
    );

    return [cartesianX, cartesianY, 0.001];
  };

  return {
    getCartesianCoordinates,
    getCartesianX,
    getCartesianY,
  };
};

export default useCartesianCoordinates;
