"use client";
import { createContext, useContext, useReducer, useEffect } from "react";

const initialState = {
  currentProgress: 0, // This is the progress displayed to the user
  targetProgress: 0, // This is the actual progress you want to reach
};

function loadingReducer(state, action) {
  switch (action.type) {
    case "SET_PROGRESS":
      return {
        ...state,
        targetProgress: parseFloat(action.payload.toFixed(3)), // Round targetProgress
      };
    case "SET_CURRENT_PROGRESS":
      const progress =
        action.payload > 99.1 ? 100 : parseFloat(action.payload.toFixed(2));
      return {
        ...state,
        currentProgress: progress,
      };
    default:
      return state;
  }
}

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loadingReducer, initialState);

  return (
    <LoadingContext.Provider value={{ state, dispatch }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
