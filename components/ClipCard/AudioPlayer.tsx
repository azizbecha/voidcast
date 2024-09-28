import { LegacyRef } from "react"

interface Props {
    currentTime: number,
    duration: number,
    waveRef: LegacyRef<HTMLDivElement>
}

export const AudioPlayer: React.FC<Props> = ({ currentTime, duration, waveRef }) => {
    return (
        <>
            {/* Audio Waveform */}
            <div ref={waveRef} className="w-full custom-waveform mb-6"></div>

            {/* Progress Bar */}
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

            {/* Time Display */}
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
        </>
    )
};

AudioPlayer.displayName = "AudioPlayer"