"use client"

import React, { forwardRef, useEffect, useRef, useState } from "react";
import Link from "next/link";

import WaveSurfer from "wavesurfer.js";
import { motion } from "framer-motion";

import { CardHeader } from "./CardHeader";
import { AudioPlayer } from "./AudioPlayer";
import { CardFooter } from "./CardFooter";

import { createClient } from "@/utils/supabase/client";
import { Clip, UserProfile } from "@/interfaces";

import { FaTag } from "react-icons/fa";

interface Item extends Clip {
    profiles: UserProfile;
}

interface ClipCardProps {
    clipData: Item;
    isActive: boolean;
    onClipFinish?: () => void;
    onViewportEnter?: () => void;
    onViewportLeave?: () => void;
}

const supabase = createClient();

const ClipCard = forwardRef<HTMLDivElement, ClipCardProps>(
    ({ clipData, isActive, onClipFinish, onViewportEnter, onViewportLeave }, ref) => {

        const waveSurferRef = useRef<WaveSurfer | null>(null);
        const waveformContainerRef = useRef<HTMLDivElement>(null);
        const listenTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Timeout reference

        const [currentTime, setCurrentTime] = useState(0);
        const [duration, setDuration] = useState(0);

        const [isPlaying, setIsPlaying] = useState(false);
        const [played, setPlayed] = useState(false); // Track if user listened for 3s

        const [userHasInteracted, setUserHasInteracted] = useState(false); // Track if the user has interacted

        const PLAYTHRESHOLD = 3000;

        const createWaveform = (audioUrl: string) => {
            if (waveSurferRef.current || !waveformContainerRef.current) return;

            const waveSurfer = WaveSurfer.create({
                container: waveformContainerRef.current,
                waveColor: "#ddd",
                progressColor: "#fd4d4d",
                height: 70,
                barWidth: 2,
                cursorWidth: 2,
                autoCenter: true,
                normalize: true,
                dragToSeek: true,
                barGap: 2,
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
                onClipFinish?.(); // Call the finish handler
            });

            waveSurfer.on('error', (e) => console.log(e));

            waveSurferRef.current = waveSurfer;
        };

        const startListeningTimer = () => {
            if (!listenTimeoutRef.current && !played) {
                listenTimeoutRef.current = setTimeout(async () => {
                    setPlayed(true);
                    console.log("User has listened for 3 seconds or more.");
                    // Fetch the current plays count
                    const { data: currentPlaysData, error: fetchError } = await supabase
                        .from('clips')
                        .select('plays')
                        .eq('id', clipData.id)
                        .single();
                    if (fetchError) {
                        console.error("Error fetching plays count:", fetchError);
                        return;
                    }
                    const currentPlays = currentPlaysData?.plays || 0;
                    // Update the plays count
                    const { error: updateError } = await supabase
                        .from('clips')
                        .update({ plays: currentPlays + 1 })
                        .eq('id', clipData.id);
                    if (updateError) {
                        console.error("Error updating plays count:", updateError);
                    } else {
                        console.log("Plays count updated successfully.");
                    }
                }, PLAYTHRESHOLD);
            }
        };
        const clearListeningTimer = () => {
            if (listenTimeoutRef.current) {
                clearTimeout(listenTimeoutRef.current);
                listenTimeoutRef.current = null;
            }
        };

        const playAudio = () => {
            if (waveSurferRef.current && !isPlaying && userHasInteracted) {
                waveSurferRef.current.play();
                setIsPlaying(true);
                startListeningTimer(); // Start the 3-second timer
            }
        };

        const pauseAudio = () => {
            if (waveSurferRef.current && isPlaying) {
                waveSurferRef.current.pause();
                setIsPlaying(false);
                clearListeningTimer(); // Clear the timer if paused
            }
        };

        useEffect(() => {
            if (clipData.audiofile) {
                createWaveform(clipData.audiofile);
            }

            return () => {
                if (waveSurferRef.current && userHasInteracted) {
                    waveSurferRef.current.destroy();
                    waveSurferRef.current = null;
                }
                clearListeningTimer(); // Clean up the timer
            };
        }, [clipData.audiofile, userHasInteracted]);

        // Effect to track user interaction
        useEffect(() => {

            if (userHasInteracted) return;

            const events = ["click", "touch", "keydown"];
            const handleUserInteraction = () => {
                setUserHasInteracted(true); // Set the flag when the user interacts
                events.forEach((event) => window.removeEventListener(event, handleUserInteraction));
            };

            events.forEach((event) => window.addEventListener(event, handleUserInteraction));

            return () => {
                events.forEach((event) => window.removeEventListener(event, handleUserInteraction));
            };
        }, [userHasInteracted]);

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
                    onViewportLeave?.(); // Safely call onViewportLeave if it's defined
                }}
                ref={ref}
            >
                <div className="h-full flex flex-col justify-between p-3">
                    <CardHeader
                        avatar={clipData.profiles.avatar}
                        createdAt={clipData.created_at}
                        name={clipData.profiles.full_name}
                        username={clipData.profiles.username}
                        plays={clipData.plays}
                        verified={clipData.profiles.verified}
                    />

                    <div className="flex-1 text-left text-white mt-1 flex flex-col justify-between">
                        <div className="top-0">
                            <h3 className="text-xl font-bold mb-2">{clipData.title}</h3>
                            <p className="flex-wrap font-normal text-md text-primary-100">
                                {
                                    clipData?.description?.trim().split(' ').map((word: string, key: number) => (
                                        word.trim().startsWith('#') ? (
                                            <span key={key}>
                                                <Link href={`search/${word.slice(1)}`} className="font-bold text-accent bg-primary-700 px-1.5 py-0.5 mx-0.5 rounded-md cursor-pointer">
                                                    {word.trim()}
                                                </Link>
                                                {'\n'}
                                            </span>
                                        ) : (
                                            <span key={key}>{word} </span>
                                        )
                                    ))
                                }
                            </p>
                        </div>

                        {/* Categories aligned at the bottom */}
                        <div className="mt-auto">
                            <div className="flex w-full flex-wrap justify-start items-center gap-1 mt-2">
                                {
                                    clipData.categories && clipData.categories.map((category, key) => (
                                        <span key={key} className="flex justify-center items-center flex-row space-x-1 font-bold text-primary-100 text-xs bg-secondary px-1.5 py-0.5 rounded-md cursor-pointer">
                                            <FaTag /> <span>{category}{' '}</span>
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
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
                        id={clipData.id}
                    />
                </div>
            </motion.div>
        );
    }
);

ClipCard.displayName = "ClipCard";

export default ClipCard;