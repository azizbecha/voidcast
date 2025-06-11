import * as React from "react";
import LogoIcon from "./LogoIcon";

function LgLogo() {
  return (
    <div className="flex items-center justify-start gap-2">
      <LogoIcon />
      <span className="text-2xl font-bold text-accent">VoidCast</span>
      <span className="hidden md:block bg-accent px-2 py-0.5 rounded-full text-xs text-white font-bold">
        BETA
      </span>
    </div>
  );
}

export default LgLogo;
