import React from "react";

interface TrackProps {
  props: React.HTMLAttributes<HTMLDivElement>;
  children: React.ReactNode;
  leftWidth: number;
  rightWidth: number;
  selectedWidth: number;
  selectedDuration: string;
}

const Track: React.FC<TrackProps> = ({
  props,
  children,
  leftWidth,
  rightWidth,
  selectedWidth,
  selectedDuration,
}) => (
  <div
    className="absolute rounded-lg z-40 py-2"
    {...props}
    style={{
      ...props.style,
      width: "100%",
      background: `linear-gradient(to right, transparent ${leftWidth}%, #fd4d4d ${leftWidth}%, #fd4d4d ${
        100 - rightWidth
      }%, transparent ${100 - rightWidth}%)`,
    }}
  >
    {children}
    <div className="flex justify-center items-center">
      <div
        className="absolute text-sm text-center font-bold text-primary-100 cursor-grab"
        style={{
          left: `${leftWidth}%`,
          width: `${selectedWidth}%`,
        }}
      >
        <span>{selectedDuration}</span>
      </div>
    </div>
  </div>
);

export default Track;
