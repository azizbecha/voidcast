import React from "react";

interface TagProps {
  glow?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({ children, glow, className = "" }) => {
  return (
    <div
      className={`cursor-pointer bg-primary-700 hover:bg-primary-600 text-sm px-2 font-bold text-primary-100 justify-center items-center rounded flex ${
        glow ? `border` : ``
      } ${className}`}
      style={{
        height: "22px",
        boxShadow: glow ? "0px 0px 7px var(--color-accent-glow)" : "",
        border: glow ? ".5px solid var(--color-accent)" : "",
      }}
    >
      {children}
    </div>
  );
};
