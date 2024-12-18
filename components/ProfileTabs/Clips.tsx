"use client"

import { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";

import { Clip } from "@/interfaces";

import { Loader } from "../ui/Loader";

import { ClipPlayer } from "./ClipPlayer";

interface ClipsTabProps {
    userId: string;
}

export const Clips: React.FC<ClipsTabProps> = ({ userId }) => {

    
    const [clips, setClips] = useState<Clip[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchClips = async () => {
            const supabase = createClient();
            
            setLoading(true);

            const { data, error } = await supabase
                .from('clips')
                .select('*')
                .eq('creator', userId)
                .order('created_at', { ascending: false });

            if (error) {
                setError(error.message);
            } else {
                setClips(data as Clip[]);
            }

            setLoading(false);
        };

        fetchClips();
    }, [userId]);

    if (loading) return <div className="flex justify-center items-center"><Loader /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="h-full overflow-y-scrolll">
            <h4 className="mb-2">Clips</h4>
            {clips.length === 0 ? (
                <p>No clips available.</p>
            ) : (
                <div className="h-full sticky top-0">
                    {clips.map((clip, key) => (
                        <ClipPlayer clip={clip} key={key} />
                    ))}
                </div>
            )}
        </div>
    );
};