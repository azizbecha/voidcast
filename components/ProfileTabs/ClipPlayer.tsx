"use client";

import { useEffect, useRef, useState } from "react";

import moment from "moment";
import WaveSurfer from "wavesurfer.js";

import { AudioPlayer } from "../ClipCard/AudioPlayer";
import { CardFooter } from "../ClipCard/CardFooter";

import { FaClock, FaPlay } from "react-icons/fa6";

import { Clip } from "@/interfaces";

interface Props {
    clip: Clip;
}

export const ClipPlayer: React.FC<Props> = ({ clip }) => {
    const waveformContainerRef = useRef<HTMLDivElement>(null); // Ref for waveform container
    const waveSurferRef = useRef<WaveSurfer | null>(null);     // Ref for WaveSurfer instance
    const [isPlaying, setIsPlaying] = useState(false);         // Track playing state
    const [duration, setDuration] = useState(0);               // Track duration of audio
    const [currentTime, setCurrentTime] = useState(0);         // Track current playback time
    const [userHasInteracted, setUserHasInteracted] = useState(false);

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
        });

        waveSurfer.on('error', (e) => console.log(e));

        waveSurferRef.current = waveSurfer;
    };

    useEffect(() => {
        if (clip.audiofile) {
            createWaveform(clip.audiofile);
        }

        return () => {
            if (waveSurferRef.current && userHasInteracted) {
                waveSurferRef.current.destroy();
                waveSurferRef.current = null;
            }
        };
    }, [clip.audiofile, userHasInteracted]);

    // Effect to track user interaction
    useEffect(() => {
        const events = ["click", "touch"];
        const handleUserInteraction = () => {
            setUserHasInteracted(true); // Set the flag when the user interacts
            events.forEach((event) => window.removeEventListener(event, handleUserInteraction));
        };

        events.forEach((event) => window.addEventListener(event, handleUserInteraction));

        return () => {
            events.forEach((event) => window.removeEventListener(event, handleUserInteraction));
        };
    }, []);

    // Play audio
    const playAudio = () => {
        if (waveSurferRef.current) {
            waveSurferRef.current.play();
            setIsPlaying(true);
        }
    };

    // Pause audio
    const pauseAudio = () => {
        if (waveSurferRef.current) {
            waveSurferRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div key={clip.id} className="bg-primary-700 p-3 mb-2 rounded-lg">
            <p className="text-lg font-bold">{clip.title}</p>
            <p className="text-sm my-2">{clip.description}</p>

            <AudioPlayer currentTime={currentTime} duration={duration} waveRef={waveformContainerRef} />
            <CardFooter isPlaying={isPlaying} pauseAudio={pauseAudio} playAudio={playAudio} id={clip.id} />

            <div className="flex justify-between items-center mt-3">
                <span className="flex gap-1 items-center text-sm">
                    <FaPlay /> {clip.plays} plays
                </span>
                <span className="flex gap-1 items-center text-sm">
                    <FaClock /> {moment(clip.created_at).fromNow()}
                </span>
            </div>
        </div>
    );
};
