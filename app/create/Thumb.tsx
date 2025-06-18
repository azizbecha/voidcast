// Thumb.tsx
import React from "react";
import { cn } from "@/lib/utils";
import { formatTime } from "./formatTime";

interface ThumbProps {
  props: React.HTMLAttributes<HTMLDivElement>;
  value: number;
  isDragged: boolean;
}

const Thumb: React.FC<ThumbProps> = ({ props, value, isDragged }) => {
  return (
    <div
      {...props}
      className={cn(
        "flex justify-center items-center rounded-full w-5.5 h-5.5 text-primary-100 border-2 border-primary-100",
        `bg-${isDragged ? "accent" : "primary-800"}`
      )}
    >
      <span className="text-xs font-bold">{formatTime(value)}</span>
    </div>
  );
};

export default Thumb;
