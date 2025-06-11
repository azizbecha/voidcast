import React from "react";
import Link from "next/link"
;
import { useScreenType } from "@/shared-hooks/useScreenType";

import LgLogo from "./LgLogo";
import LogoIcon from "./LogoIcon";

const LeftHeader: React.FC = ({}) => {
  const screenType = useScreenType();
  return (
    <Link href="/" className="w-full">
      {screenType === "3-cols" ? (
        <LgLogo />
      ) : (
        <div className="flex justify-center w-full">
          <LogoIcon />
        </div>
      )}
    </Link>
  );
};

export default LeftHeader;
