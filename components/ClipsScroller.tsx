"use client";

import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import ClipCard from "./ClipCard";
import { Clip, UserProfile } from "@/interfaces";
import { Loader } from "./ui/Loader";

interface Item extends Clip {
  profiles: UserProfile;
}

interface Props {
  query?: string;
}

const supabase = createClient();

const fetchData = async (query?: string) => {
  try {
    let queryBuilder = supabase
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

    // Conditionally apply the filter if query is provided
    if (query) {
      queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
    }

    const { data, error } = await queryBuilder;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const ClipsScroller: React.FC<Props> = ({ query }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // New loading state
  const [currentClipIndex, setCurrentClipIndex] = useState<number>(0); // Track the active clip
  const clipRefs = useRef<(HTMLDivElement | null)[]>([]); // Store refs for each clip, allow nulls
  const containerRef = useRef<HTMLDivElement | null>(null); // Ref for the scroll container

  useEffect(() => {
    const loadData = async () => {
      setLoading(true); // Set loading to true when fetching starts
      const fetchedItems = await fetchData(query);
      setItems(fetchedItems);
      setLoading(false); // Set loading to false when fetching completes
    };

    loadData();
  }, [query]);

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

  if (loading) return <div className="flex justify-center items-center p-4"><Loader /></div>;
  if (items.length === 0) return (
    <div className="flex justify-center items-center flex-col h-full p-4">
      <p className="text-xl">No results found</p>
      <p className="text-base font-normal">Try searching with different keywords</p>
    </div>
  );

  return (
    <div className="overflow-y-auto scrollbar-hide h-full bg-primary-800 flex flex-col items-center rounded-lg sticky top-0 snap-y">
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory w-full space-y-4 scrollbar-hide"
      >
        {
          items.map((item, index) => (
            <ClipCard
              key={index}
              ref={(el) => {
                clipRefs.current[index] = el;
              }}
              clipData={item}
              isActive={index === currentClipIndex} // Only play the active clip
              onClipFinish={handleClipFinish} // Handle when a clip finishes
              onViewportEnter={() => setCurrentClipIndex(index)}
            />
          ))
        }
      </div>
    </div>
  );
};

export default ClipsScroller;
