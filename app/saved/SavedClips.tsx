"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";

import { Button } from "@/components/ui/Button";
import ClipCard from "@/components/ClipCard";

import { FaFilter } from "react-icons/fa6";

import { Clip, UserProfile } from "@/interfaces";

interface Props {
    id: string;
}

interface SavedClip {
    clips: Clip;
    profiles: UserProfile;
    id: string;
    saved_at: string;
    saved_by: string;
    clipId: string;
}

const supabase = createClient();

export const SavedClips: React.FC<Props> = ({ id }) => {
    const [clips, setClips] = useState<SavedClip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            let queryBuilder = supabase
                .from("savedClips")
                .select(`
                    *,
                    clips (*),
                    profiles (full_name, username, avatar, verified)
                `)
                .eq("saved_by", id)
                .order("saved_at", { ascending: false });

            const { data, error } = await queryBuilder;

            if (error) {
                console.error("Error fetching saved clips:", error);
            } else {
                setClips(data as SavedClip[]);
            }
            setLoading(false);
        };

        fetchData();
    }, [id]);

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-white">Saved Clips</h3>
                <Button size="small" color="primary" icon={<FaFilter />}>
                    Filter
                </Button>
            </div>

            {/* Loader */}
            {loading && (
                <div className="flex justify-center items-center p-4">
                    <p>Loading...</p>
                </div>
            )}

            {/* Clips List */}
            {!loading && clips.length === 0 ? (
                <div className="flex justify-center items-center flex-col h-full p-4">
                    <p className="text-xl">No results found</p>
                    <p className="text-base font-normal">Try searching with different keywords</p>
                </div>
            ) : (
                <div className="h-full overflow-y-auto w-full space-y-4 scrollbar-hide">
                    {clips.map((clip, key) => (
                        <ClipCard
                            key={key}
                            isActive={true}
                            clipData={{
                                ...clip.clips, // Spread all properties from clip.clips
                                profiles: clip.profiles, // Embed profiles directly
                            }}
                        />
                    ))}
                </div>
            )}
        </>
    );
};
