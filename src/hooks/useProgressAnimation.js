"use client";
import { useEffect } from "react";

const easeOutQuad = (t) => t * (2 - t);

export const useProgressAnimation = (
  currentProgress,
  targetProgress,
  dispatch,
) => {
  useEffect(() => {
    if (currentProgress < targetProgress) {
      let animationFrameId;
      const step = () => {
        const delta = targetProgress - currentProgress;
        const increment = easeOutQuad(0.05) * delta;

        if (currentProgress < targetProgress) {
          dispatch({
            type: "SET_CURRENT_PROGRESS",
            payload: currentProgress + increment,
          });
          animationFrameId = requestAnimationFrame(step);
        } else {
          dispatch({ type: "SET_CURRENT_PROGRESS", payload: targetProgress });
        }
      };

      animationFrameId = requestAnimationFrame(step);

      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [currentProgress, targetProgress, dispatch]);
};
