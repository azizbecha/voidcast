import React from "react";

import Image from "next/image";

import { motion } from "framer-motion";
import moment from 'moment';

import { FaPauseCircle, FaPlayCircle, FaHeart, FaShare } from "react-icons/fa";
import AudioWave from "./AudioWave";
import { FaPlay } from "react-icons/fa6";
import { Clip, UserProfile } from "@/interfaces";
import { MdVerified } from "react-icons/md";

interface Item extends Clip {
    profiles: UserProfile
}

interface ClipCardProps {
    item: Item;
    index: number;
    isPlaying: boolean;
    currentIndex: number;
    setCurrentIndex: (index: number) => void;
    waveSurferRef: React.MutableRefObject<any[]>;
    createWaveform: (container: HTMLElement, audioUrl: string) => any;
    handlePlayPause: (index: number) => void;
    currentTime: number;
    duration: number;
}

const ClipCard: React.FC<ClipCardProps> = ({
    item,
    index,
    isPlaying,
    currentIndex,
    setCurrentIndex,
    waveSurferRef,
    createWaveform,
    handlePlayPause,
    currentTime,
    duration,
}) => {

    const bounceTransition = {
        type: "spring",
        stiffness: 300,
        damping: 20,
    };

    return (
        <motion.div
            className={`h-full w-full mx-auto bg-primary-800 rounded-lg overflow-hidden shadow-lg snap-center ${currentIndex === index ? "z-10" : "z-0"
                }`}
            animate={{
                scale: currentIndex === index ? 1 : 0.9,
                opacity: currentIndex === index ? 1 : 0.8,
            }}
            transition={bounceTransition}
            onViewportEnter={() => {
                setCurrentIndex(index);
            }}
        >
            <div className="h-full flex flex-col justify-between p-3">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                        <Image
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                            src={item.profiles.avatar}
                            alt={item.profiles.full_name}
                        />
                        <div className="text-white flex flex-col">
                            <div className="flex flex-row space-x-1.5 items-center justify-start">
                                <span className="font-semibold">{item.profiles.full_name}</span>
                                {
                                    item.profiles.verified && (
                                        <MdVerified className="text-blue-500" size={15} />
                                    )
                                }
                            </div>

                            <span className="text-sm text-primary-300">{moment(item.created_at).fromNow()}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <FaPlay />
                        <span>{item.plays} plays</span>
                    </div>
                </div>

                <div className="flex-1 text-center text-white mt-2">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-primary-100">{item.description}</p>
                </div>

                <AudioWave
                    index={index}
                    waveSurferRef={waveSurferRef}
                    createWaveform={createWaveform}
                    audiofile={item.audiofile}
                    currentTime={currentTime}
                    duration={duration}
                />

                <div className="flex justify-between mt-4">
                    <motion.div
                        whileTap={{ scale: 1.2 }}
                        className="w-14 h-14 p-3 rounded-full bg-accent flex justify-center items-center text-white text-3xl cursor-pointer"
                    >
                        <FaHeart />
                    </motion.div>

                    <motion.div
                        whileTap={{ scale: 1.2 }}
                        className="w-14 h-14 p-3 rounded-full bg-accent flex justify-center items-center text-white text-3xl cursor-pointer"
                        onClick={() => handlePlayPause(index)}
                    >
                        {isPlaying && currentIndex === index ? (
                            <FaPauseCircle />
                        ) : (
                            <FaPlayCircle />
                        )}
                    </motion.div>

                    <motion.div
                        whileTap={{ scale: 1.2 }}
                        className="w-14 h-14 p-3 rounded-full bg-accent flex justify-center items-center text-white text-3xl cursor-pointer"
                    >
                        <FaShare />
                    </motion.div>
                    
                </div>
            </div>
        </motion.div>
    );
};

export default ClipCard;
