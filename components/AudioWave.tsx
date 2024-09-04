import React from "react";

interface AudioWaveProps {
  index: number;
  waveSurferRef: React.MutableRefObject<any[]>;
  createWaveform: (container: HTMLElement, audioUrl: string) => any;
  audiofile: string;
  currentTime: number;
  duration: number;
}

const AudioWave: React.FC<AudioWaveProps> = ({
  index,
  waveSurferRef,
  createWaveform,
  audiofile,
  currentTime,
  duration,
}) => {
  return (
    <div className="wave-progress mt-3">
      <div
        id={`waveform-${index}`}
        className="w-full custom-waveform mb-5"
        ref={(el) => {
          if (el && !waveSurferRef.current[index]) {
            waveSurferRef.current[index] = createWaveform(el, audiofile);
          }
        }}
      ></div>
      <div className="relative w-full">
        <div className="absolute bottom-0 left-0 right-0 rounded-full h-1 bg-gray-700 mb-2">
          <div
            className="bg-accent h-full rounded-full"
            style={{
              width: `${(currentTime / duration) * 100}%`,
            }}
          ></div>
          <div
            className="absolute w-3 h-3 bg-white rounded-full"
            style={{
              left: `${(currentTime / duration) * 100}%`,
              transform: "translateX(-50%)",
              top: "-4px",
            }}
          ></div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-sm text-gray-300">
          {Math.floor(currentTime / 60)}:
          {Math.floor(currentTime % 60)
            .toString()
            .padStart(2, "0")}
        </div>
        <div className="text-sm text-gray-300">
          {Math.floor(duration / 60)}:
          {Math.floor(duration % 60)
            .toString()
            .padStart(2, "0")}
        </div>
      </div>
    </div>
  );
};

export default AudioWave;
