import React, { forwardRef, useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
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

const supabase = createClient();

const ClipCard = forwardRef<HTMLDivElement, ClipCardProps>(
    ({ data, isActive, onClipFinish, onViewportEnter, onViewportLeave }, ref) => {
        const [isPlaying, setIsPlaying] = useState(false);
        const [currentTime, setCurrentTime] = useState(0);
        const [duration, setDuration] = useState(0);
        const [userHasInteracted, setUserHasInteracted] = useState(false);
        const [played, setPlayed] = useState(false); 
        const [likesCount, setLikesCount] = useState(0); // Store total likes
        const [isLiked, setIsLiked] = useState(false); // Track if the user has liked the clip

        const waveSurferRef = useRef<WaveSurfer | null>(null);
        const waveformContainerRef = useRef<HTMLDivElement>(null);
        const listenTimeoutRef = useRef<NodeJS.Timeout | null>(null);

        const userId = supabase.auth.getUser().then(e => e.data.user?.id); // Replace with actual user ID logic

        // Fetch total likes and check if the user has already liked the clip
        const fetchLikesData = async () => {
            const { data: likesData, error: fetchError } = await supabase
                .from('clipsLikes')
                .select('*', { count: 'exact' })
                .eq('clipId', data.id);

            if (fetchError) {
                console.error("Error fetching likes count:", fetchError);
                return;
            }

            setLikesCount(likesData.length); // Set the total number of likes

            // Check if the current user has already liked the clip
            const userLiked = likesData.some(like => like.userId === userId);
            setIsLiked(userLiked);
        };

        const clearListeningTimer = () => {
            if (listenTimeoutRef.current) {
                clearTimeout(listenTimeoutRef.current);
                listenTimeoutRef.current = null;
            }
        };

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

            waveSurfer.on('error', (e) => console.log(e));

            waveSurferRef.current = waveSurfer;
        };

        useEffect(() => {
            fetchLikesData(); // Fetch likes on component mount
        }, [data.id]);

        const handleLike = async () => {
            if (isLiked) return; // Prevent multiple likes from the same user

            try {
                const { error } = await supabase
                    .from("clipsLikes")
                    .insert({ userId, clipId: data.id });

                if (!error) {
                    setLikesCount(likesCount + 1); // Increment the displayed likes count
                    setIsLiked(true); // Mark as liked
                }
            } catch (err) {
                console.error("Error liking the clip:", err);
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
                clearListeningTimer();
            };
        }, [data.audiofile, userHasInteracted]);

        useEffect(() => {
            if (isActive && userHasInteracted) {
                playAudio();
            } else {
                pauseAudio();
            }
        }, [isActive, userHasInteracted]);

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

        return (
            <motion.div
                className="h-full w-full mx-auto bg-primary-800 rounded-lg overflow-hidden shadow-lg snap-center"
                onViewportEnter={() => {
                    playAudio();
                    onViewportEnter?.();
                }}
                onViewportLeave={() => {
                    pauseAudio();
                    onViewportLeave?.();
                }}
                ref={ref}
            >
                <div className="h-full flex flex-col justify-between p-3">
                    {userId}
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
                        likesCount={likesCount} // Pass likes count to CardFooter
                        handleLike={handleLike} // Pass like handler to CardFooter
                        isLiked={isLiked} // Pass liked state to CardFooter
                    />
                </div>
            </motion.div>
        );
    }
);

ClipCard.displayName = "ClipCard";

export default ClipCard;
