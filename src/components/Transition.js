import { disableScroll, enableScroll } from "@/app/lib/scroll";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const Transition = ({ setClone, clone, canvasOffset, image }) => {
  const $group = useRef(null);
  const $mesh = useRef(null);
  const params = useSearchParams();

  useEffect(() => {
    disableScroll();
  }, []);

  useEffect(() => {
    if (!params.get("influencer")) {
      enableScroll();
      setClone(null);
    }
  }, [params]);

  useGSAP(
    () => {
      if (image.current) {
        gsap.set($mesh.current.position, {
          y: $mesh.current.position.y + canvasOffset,
        });
        gsap.to($mesh.current.position, {
          delay: 1,
          x: image.current.position[0],
          y: image.current.position[1] + canvasOffset,
          z: image.current.position[2],
          ease: "power4.out",
          duration: 1.5,
        });
        gsap.to($mesh.current.scale, {
          delay: 1,
          x: image.current.scale.scaleX,
          y: image.current.scale.scaleY,
          ease: "power4.out",
          duration: 1.5,
          onComplete: () => {
            setClone(null);
          },
        });
      }
    },
    { dependencies: [image.current] },
  );
  return (
    !!clone && (
      <group ref={$group}>
        <mesh ref={$mesh} position={clone.position} scale={clone.scale}>
          <planeGeometry args={[1, 1, 15, 15]} />
          <shaderMaterial
            opacity={1}
            fragmentShader={clone.material.fragmentShader}
            vertexShader={clone.material.vertexShader}
            uniforms={clone.material.uniforms}
          />
        </mesh>
      </group>
    )
  );
};

export default Transition;
