"use client";

import React, { useState, useEffect, useRef } from "react";

import WaveSurfer from "wavesurfer.js";

import { createClient } from "@/utils/supabase/client";

import ClipCard from "./ClipCard";
import { Clip, UserProfile } from "@/interfaces";

interface Item extends Clip{
  profiles: UserProfile
}

const supabase = createClient();

const ReelsScroll: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const waveSurferRef = useRef<WaveSurfer[]>([]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(3);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('clips')
        .select(`
          *,
          profiles (
            full_name,
            username,
            avatar,
            verified
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
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
      <div className="h-[70vh] overflow-y-scroll snap-y snap-mandatory w-full space-y-4 scrollbar-hide">
        {items.map((item, index) => (
          <ClipCard
            key={index}
            item={item}
            index={index}
            isPlaying={isPlaying}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            waveSurferRef={waveSurferRef}
            createWaveform={createWaveform}
            handlePlayPause={handlePlayPause}
            currentTime={currentTime}
            duration={duration}
          />
        ))}
      </div>
    </div>
  );
};

export default ReelsScroll;
