import React from "react";

import { Range } from "react-range";

import WavesurferPlayer from "@wavesurfer/react";
import WaveSurfer from "wavesurfer.js";

import Track from "./Track";
import Thumb from "./Thumb";
import { formatTime } from "./formatTime";

interface TrimmerProps {
  audioBuffer: AudioBuffer;
  range: number[];
  onRangeChange: (values: number[]) => void;
  onReady: (ws: WaveSurfer) => void;
  audioRef: React.RefObject<string | null>;
  setIsPlaying: (playing: boolean) => void;
}

const Trimmer: React.FC<TrimmerProps> = ({
  audioBuffer,
  range,
  onRangeChange,
  onReady,
  audioRef,
  setIsPlaying,
}) => {
  const audioDuration = audioBuffer?.duration ?? 1;
  const leftWidth = (range[0] / audioDuration) * 100;
  const rightWidth = ((audioDuration - range[1]) / audioDuration) * 100;
  const selectedWidth = 100 - leftWidth - rightWidth;
  const selectedDuration = formatTime(range[1] - range[0]);
  return (
    <div className="relative w-full rounded-lg z-35">
      <Range
        step={0.1}
        min={0}
        max={audioBuffer.duration}
        values={range}
        allowOverlap
        draggableTrack
        onChange={onRangeChange}
        renderTrack={({ props, children }) => (
          <Track
            props={props}
            leftWidth={leftWidth}
            rightWidth={rightWidth}
            selectedWidth={selectedWidth}
            selectedDuration={selectedDuration}
          >
            {children}
          </Track>
        )}
        renderThumb={({ props, value, isDragged }) => (
          <Thumb props={props} value={value} isDragged={isDragged} />
        )}
      />
      <div
        className="absolute z-30 top-0 left-0 h-full bg-gray-900 opacity-80 rounded-l-lg cursor-not-allowed"
        style={{
          width: `${leftWidth}%`,
          borderRight: "2px solid #fff",
        }}
      ></div>
      <div
        className="absolute z-30 top-0 right-0 h-full bg-gray-900 opacity-80 rounded-r-lg cursor-not-allowed"
        style={{
          width: `${rightWidth}%`,
          borderLeft: "2px solid #fff",
        }}
      ></div>
      {audioBuffer && (
        <WavesurferPlayer
          height={100}
          waveColor="#374151"
          progressColor="#fd4d4d"
          cursorColor="#5575fd"
          autoCenter
          url={audioRef.current!}
          onReady={onReady}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          normalize
          autoScroll
          dragToSeek
          cursorWidth={3}
        />
      )}
    </div>
  );
};

export default Trimmer;
