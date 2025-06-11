"use client";

import React from "react";
import { useScreenType } from "@/shared-hooks/useScreenType";

interface Props {
  children: React.ReactNode;
}

export const GridLayout: React.FC<Props> = ({ children }) => {
  const screenType = useScreenType();

  // Define grid layout based on screen type
  const getGridClasses = () => {
    switch (screenType) {
      case "3-cols":
        return "grid grid-cols-3 min-h-screen";
      case "2-cols":
        return "grid grid-cols-2 min-h-screen";
      case "1-cols":
        return "flex justify-center min-h-screen";
      case "fullscreen":
        return "flex justify-center min-h-screen";
      default:
        return "flex justify-center min-h-screen";
    }
  };

  return <div className={getGridClasses()}>{children}</div>;
};
