"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import WaveSurfer from "wavesurfer.js";
import { FaCog, FaPauseCircle, FaPlayCircle, FaHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import { Clip } from "@/interfaces";

const supabase = createClient();

const ReelsScroll: React.FC = () => {
  const [items, setItems] = useState<Clip[]>([]);
  const waveSurferRef = useRef<WaveSurfer[]>([]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(3);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("clips")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePlayPause = (index: number) => {
    const waveSurfer = waveSurferRef.current[index];

    if (waveSurfer.isPlaying()) {
      waveSurfer.pause();
      setIsPlaying(false);
    } else {
      waveSurfer.play();
      setIsPlaying(true);
    }

    waveSurfer.on("audioprocess", () => {
      setCurrentTime(waveSurfer.getCurrentTime());
      setDuration(waveSurfer.getDuration());
    });

    waveSurfer.on("seeking", () => {
      setCurrentTime(waveSurfer.getCurrentTime());
    });

    waveSurfer.on("finish", () => {
      setIsPlaying(false);
    });
  };

  const pauseAllExceptCurrent = (currentIndex: number) => {
    waveSurferRef.current.forEach((waveSurfer, index) => {
      if (waveSurfer && index !== currentIndex && waveSurfer.isPlaying()) {
        waveSurfer.stop();
      }
    });
  };

  const createWaveform = (container: HTMLElement, audioUrl: string) => {
    const waveSurfer: WaveSurfer = WaveSurfer.create({
      container,
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
    waveSurfer.setVolume(1); // Set to 1 so that audio is ready to play when the user interacts
    return waveSurfer;
  };

  const bounceTransition = {
    type: "spring",
    stiffness: 300,
    damping: 20,
  };

  useEffect(() => {
    if (waveSurferRef.current[currentIndex]) {
      // Pause all other audio instances
      pauseAllExceptCurrent(currentIndex);

      // Automatically play the audio when a new item enters the viewport
      handlePlayPause(currentIndex);
    }
  }, [currentIndex]);

  return (
    <div className="h-screen overflow-hidden bg-primary-800 flex flex-col items-center rounded-lg">
      <div className="h-[80vh] overflow-y-scroll snap-y snap-mandatory w-full space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className={`h-full border w-full mx-auto bg-primary-800 rounded-lg overflow-hidden shadow-lg snap-center ${currentIndex === index ? "z-10" : "z-0"
              }`}
            animate={{
              scale: currentIndex === index ? 1 : 0.9,
              opacity: currentIndex === index ? 1 : 0.8,
            }}
            transition={bounceTransition}
            onViewportEnter={() => {
              setCurrentIndex(index);
              setCurrentTime(0);
            }}
          >
            <div className="h-full flex flex-col justify-between p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <img
                    className="w-6 h-6 rounded-full object-cover"
                    src="https://avatars.githubusercontent.com/u/63454940?v=4"
                    alt="User Avatar"
                  />
                  <div className="text-white flex flex-col">
                    <span className="font-bold">Aziz Becha</span>
                    <span className="text-sm text-primary-300">
                      2 days ago
                    </span>
                  </div>
                </div>

                <FaCog size={17} className="text-white cursor-pointer" />
              </div>

              <div className="flex-1 text-center text-white mt-2">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-primary-100">
                  {item.description}
                </p>
              </div>

              {/* This is the sticky footer part */}
              <div className="mt-auto">
                <div className="wave-progress mt-3">
                  <div
                    id={`waveform-${index}`}
                    className="w-full custom-waveform mb-5"
                    ref={(el) => {
                      if (el && !waveSurferRef.current[index]) {
                        waveSurferRef.current[index] = createWaveform(
                          el,
                          item.audiofile
                        );
                      }
                    }}
                  >
                  </div>
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
        ))}
      </div>
    </div>
  );
};

export default ReelsScroll;
