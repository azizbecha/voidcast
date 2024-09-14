import React, { forwardRef, useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";
import { motion } from "framer-motion";

import { CardHeader } from "./CardHeader";
import { AudioPlayer } from "./AudioPlayer";
import { CardFooter } from "./CardFooter";

import { Clip, UserProfile } from "@/interfaces";

interface Item extends Clip {
    profiles: UserProfile;
}

interface ClipCardProps {
    data: Item;
    isActive: boolean;
    onClipFinish: () => void;
    onViewportEnter?: () => void;
    onViewportLeave?: () => void;
}

const ClipCard = forwardRef<HTMLDivElement, ClipCardProps>(
    ({ data, isActive, onClipFinish, onViewportEnter, onViewportLeave }, ref) => {
        const [isPlaying, setIsPlaying] = useState(false);
        const [currentTime, setCurrentTime] = useState(0);
        const [duration, setDuration] = useState(0);
        const [userHasInteracted, setUserHasInteracted] = useState(false); // Track if the user has interacted
        const waveSurferRef = useRef<WaveSurfer | null>(null);
        const waveformContainerRef = useRef<HTMLDivElement>(null);

        const createWaveform = (audioUrl: string) => {
            if (waveSurferRef.current || !waveformContainerRef.current) return;

            const waveSurfer = WaveSurfer.create({
                container: waveformContainerRef.current,
                waveColor: "#ddd",
                progressColor: "#fd4d4d",
                height: 90,
                barWidth: 3,
                cursorWidth: 3,
                autoCenter: true,
                normalize: true,
                dragToSeek: true,
            });

            waveSurfer.load(audioUrl);
            waveSurfer.setVolume(1);

            waveSurfer.on("ready", () => {
                setDuration(waveSurfer.getDuration());
            });

            waveSurfer.on("audioprocess", () => {
                setCurrentTime(waveSurfer.getCurrentTime());
            });

            waveSurfer.on("finish", () => {
                setIsPlaying(false);
                setCurrentTime(0);
                onClipFinish(); // Call the finish handler
            });

            waveSurfer.on('error', (e) => console.log(e))

            waveSurferRef.current = waveSurfer;
        };

        const playAudio = () => {
            if (waveSurferRef.current && !isPlaying && userHasInteracted) {
                waveSurferRef.current.play();
                setIsPlaying(true);
            }
        };

        const pauseAudio = () => {
            if (waveSurferRef.current && isPlaying) {
                waveSurferRef.current.pause();
                setIsPlaying(false);
            }
        };

        useEffect(() => {
            if (data.audiofile) {
                createWaveform(data.audiofile);
            }

            return () => {
                if (waveSurferRef.current && userHasInteracted) {
                    waveSurferRef.current.destroy();
                    waveSurferRef.current = null;
                }
            };
        }, [data.audiofile, userHasInteracted]);

        // Effect to track user interaction
        useEffect(() => {
            const events = ["click", "touch", "keydown"];
            const handleUserInteraction = () => {
                setUserHasInteracted(true); // Set the flag when the user interacts
                events.map((event) => window.removeEventListener(event, handleUserInteraction));
            };

            // Add listeners for user interaction (e.g., click, keydown)
            events.map((event) => window.addEventListener(event, handleUserInteraction));

            return () => {
                events.map((event) => window.removeEventListener(event, handleUserInteraction));
            };
        }, []);

        useEffect(() => {
            if (isActive && userHasInteracted) {
                playAudio();
            } else {
                pauseAudio();
            }
        }, [isActive, userHasInteracted]);

        return (
            <motion.div
                className="h-full w-full mx-auto bg-primary-800 rounded-lg overflow-hidden shadow-lg snap-center"
                onViewportEnter={() => {
                    playAudio();
                    onViewportEnter?.(); // Safely call onViewportEnter if it's defined
                }}
                onViewportLeave={() => {
                    pauseAudio();
                    onViewportLeave?.(); // Safely call onViewportEnter if it's defined
                }}
                ref={ref}
            >
                <div className="h-full flex flex-col justify-between p-3">
                    <CardHeader
                        avatar={data.profiles.avatar}
                        createdAt={data.created_at}
                        name={data.profiles.full_name}
                        plays={data.plays}
                        verified={data.profiles.verified}
                    />

                    <div className="flex-1 text-center text-white mt-2">
                        <h3 className="text-xl font-semibold mb-2">{data.title}</h3>
                        <p className="text-sm text-primary-100">{data.description}</p>
                    </div>

                    <AudioPlayer
                        waveRef={waveformContainerRef}
                        duration={duration}
                        currentTime={currentTime}
                    />

                    <CardFooter
                        isPlaying={isPlaying}
                        pauseAudio={pauseAudio}
                        playAudio={playAudio}
                    />
                </div>
            </motion.div>
        );
    }
);

ClipCard.displayName = "ClipCard";

export default ClipCard;
