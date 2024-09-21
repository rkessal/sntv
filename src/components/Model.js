import useCartesianCoordinates from "@/hooks/useCatesianCoordinates";
import { fragment, vertex } from "@/shaders/shader";
import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useRef } from "react";

const Model = ({ element, group, onClick }) => {
  const $ref = useRef(null);
  const { size, viewport } = useThree();
  const { x, y, height, width } = element.getBoundingClientRect();
  const screenWidth = size.width;
  const screenHeight = size.height;
  const coordinates = useRef([0, 0, 0]);

  const uid = element.dataset.influencer;

  if (group.current) {
    group.current.position.x = 0;
  }

  const texture = useTexture(element.dataset.imgSrc);
  const uniforms = useRef({
    tMap: { value: texture },
    uvAspect: { value: [1.0, 1.0] },
    uDistance: { value: 0 },
    uCenterOffset: { value: 0 },
    uOpacity: { value: 1 },
  });

  const { getCartesianCoordinates } = useCartesianCoordinates(viewport, size);
  const getMeshScale = () => {
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

  const scale = getMeshScale();

  coordinates.current = getCartesianCoordinates({ x, y, height, width });

  const imageAspectRatio = texture.image.width / texture.image.height;
  const planeAspectRatio = scale.scaleX / scale.scaleY;

  const ratio = planeAspectRatio / imageAspectRatio;

  if (ratio > 1) {
    uniforms.current.uvAspect.value = [1.0, 1 / ratio];
  } else {
    uniforms.current.uvAspect.value = [ratio, 1.0];
  }

  return (
    <mesh
      ref={$ref}
      onPointerUp={() => onClick(uid, $ref)}
      position={coordinates.current}
      scale={[scale.scaleX, scale.scaleY, 0.0001]}
    >
      <planeGeometry args={[1, 1, 15, 15]} />
      <shaderMaterial
        transparent
        opacity={1}
        fragmentShader={fragment}
        vertexShader={vertex}
        uniforms={uniforms.current}
      />
    </mesh>
  );
};

export default Model;
