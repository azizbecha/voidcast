import React from "react";

import { useScreenType } from "@/shared-hooks/useScreenType";

import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";
import { SearchInput } from "./SearchInput";

export const MiddleHeader: React.FC = () => {
  const screenType = useScreenType();
  return (
    <div className="flex flex-1 justify-center w-full">
      {screenType === "fullscreen" && (
        <div className="flex mr-4">
          <LeftHeader />
        </div>
      )}
      <SearchInput />
      {(screenType === "1-cols" || screenType === "fullscreen") && (
        <div className="flex ml-4">
          <RightHeader />
        </div>
      )}
    </div>
  );
};
