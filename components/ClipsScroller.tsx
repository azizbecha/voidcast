"use client";

import React, { useState, useEffect, useRef } from "react";

import { createClient } from "@/utils/supabase/client";

import ClipCard from "./ClipCard";

import { Clip, UserProfile } from "@/interfaces";

interface Item extends Clip {
  profiles: UserProfile;
}

const supabase = createClient();

const ClipsScroller: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentClipIndex, setCurrentClipIndex] = useState<number>(0); // Track the active clip
  const clipRefs = useRef<(HTMLDivElement | null)[]>([]); // Store refs for each clip, allow nulls
  const containerRef = useRef<HTMLDivElement | null>(null); // Ref for the scroll container

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("clips")
        .select(`
          *,
          profiles (
            full_name,
            username,
            avatar,
            verified
          )
        `)
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

  // Scroll to the next clip
  const handleClipFinish = () => {
    if (currentClipIndex < items.length - 1) {
      const nextIndex = currentClipIndex + 1;
      setCurrentClipIndex(nextIndex); // Move to the next clip

      // Scroll the next clip into view within the container
      if (clipRefs.current[nextIndex] && containerRef.current) {
        clipRefs.current[nextIndex].scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-primary-800 flex flex-col items-center rounded-lg">
      <div
        ref={containerRef}
        className="h-[70vh] overflow-y-scroll snap-y snap-mandatory w-full space-y-4 scrollbar-hide"
      >
        {items.map((item, index) => (
          <ClipCard
            key={index}
            ref={(el) => {
              clipRefs.current[index] = el;
            }}
            data={item}
            isActive={index === currentClipIndex} // Only play the active clip
            onClipFinish={handleClipFinish} // Handle when a clip finishes
            onViewportEnter={() => setCurrentClipIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ClipsScroller;
