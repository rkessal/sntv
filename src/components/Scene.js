"use client";
import { useLoading } from "@/app/store/loading-scene";
import useCartesianCoordinates from "@/hooks/useCatesianCoordinates";
import useCartesianScale from "@/hooks/useCatesianScale";
import { useProgress } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { forwardRef, useEffect, useRef, useState } from "react";
import Model from "./Model";
import { useProgressAnimation } from "@/hooks/useProgressAnimation";

const Scene = forwardRef(
  ({ imageRef, setClone, setCanvasOffset, image }, ref) => {
    const { progress } = useProgress();
    const { dispatch, state } = useLoading();
    const { viewport, size, gl } = useThree();
    const { getCartesianX, getCartesianY, getCartesianCoordinates } =
      useCartesianCoordinates(viewport, size);
    const { getScale } = useCartesianScale(viewport, size);
    const $group = useRef(null);
    const $transitionGroup = useRef(null);
    const [influencers, setInfluencers] = useState([]);

    const x = useRef({ start: 0, end: 0, distance: 0, velocity: 0 });
    const isDown = useRef(false);
    const momentum = useRef(null);

    const { currentProgress, targetProgress } = state;
    useProgressAnimation(currentProgress, targetProgress, dispatch);

    useEffect(() => {
      dispatch({ type: "SET_PROGRESS", payload: progress });
    }, [progress, dispatch]);

    useEffect(() => {
      setInfluencers(
        Array.from(document.querySelectorAll("[data-influencer]")),
      );
    }, []);

    useEffect(() => {
      if (imageRef.current) {
        const { x, y, height, width } =
          imageRef.current.getBoundingClientRect();
        image.current.position = getCartesianCoordinates({
          x,
          y,
          height,
          width,
        });
        image.current.scale = getScale({ height, width });
      }
    }, [imageRef.current]);

    const getTranslateXY = (element) => {
      const style = window.getComputedStyle(element);
      const matrix = new DOMMatrixReadOnly(style.transform);
      return {
        translateX: matrix.m41,
        translateY: matrix.m42,
      };
    };

    const onPointerDown = (e) => {
      isDown.current = true;
      x.current.start = e.clientX;
      const canvas = gl.domElement;
      canvas.classList.add("cursor-grabbing");

      if (momentum.current) {
        momentum.current = null;
        x.current.velocity = 0;
        $group.current.children.forEach((m) => {
          m.material.uniforms.uDistance.value = 0;
        });
      }
    };

    const onPointerMove = (e) => {
      if (!isDown.current) return;

      x.current.end = e.clientX;
      x.current.distance = x.current.end - x.current.start;
      x.current.start = e.clientX;

      x.current.velocity = x.current.distance;

      const distanceCartesian = getCartesianX({
        x: x.current.distance,
        width: size.width,
      });
      $group.current.position.x += distanceCartesian;
      $group.current.children.forEach((m) => {
        m.material.uniforms.uDistance.value = x.current.distance;
      });
      const currentX = getTranslateXY(ref.current);
      gsap.set(ref.current, {
        x: currentX.translateX + x.current.distance,
      });
    };

    const onPointerUp = () => {
      isDown.current = false;
      const canvas = gl.domElement;
      canvas.classList.remove("cursor-grabbing");

      momentum.current = { velocity: x.current.velocity };
    };

    const setInfluencerParam = (uid) => {
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.set("influencer", uid);
      window.history.pushState(null, "", `?${currentParams.toString()}`);
    };

    const onClickHandler = async (uid, el) => {
      if (Math.abs(el.current.material.uniforms.uDistance.value) >= 0.01)
        return;
      const canvas = gl.domElement;
      const { top, height } = canvas.getBoundingClientRect();
      const offset = getCartesianY({ y: top, height });
      setCanvasOffset(offset);
      setClone(el.current);
      setInfluencerParam(uid);
    };

    useFrame(() => {
      if (momentum.current && Math.abs(momentum.current.velocity) > 0.01) {
        momentum.current.velocity *= 0.95;

        const distanceCartesian = getCartesianX({
          x: momentum.current.velocity,
          width: size.width,
        });
        $group.current.position.x += distanceCartesian;
        $group.current.children.forEach((m) => {
          m.material.uniforms.uDistance.value = momentum.current.velocity;
        });
        const currentX = getTranslateXY(ref.current);
        gsap.set(ref.current, {
          x: currentX.translateX + momentum.current.velocity,
        });
      }
    });

    const renderPlaneEvents = () => {
      return (
        <mesh
          position={[0, 0, -0.01]}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerMove={onPointerMove}
          onPointerCancel={onPointerUp}
        >
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial transparent={true} opacity={0} />
        </mesh>
      );
    };

    return (
      <>
        {renderPlaneEvents()}
        <group ref={$transitionGroup}></group>
        <group ref={$group}>
          {influencers.map((element, index) => {
            return (
              <Model
                onClick={onClickHandler}
                distance={momentum.current?.velocity}
                group={$group}
                element={element}
                key={`inf-${index}`}
              />
            );
          })}
        </group>
      </>
    );
  },
);

Scene.displayName = "Scene";
export default Scene;
