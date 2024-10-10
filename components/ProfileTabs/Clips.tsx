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

    const supabase = createClient();

    const [clips, setClips] = useState<Clip[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClips = async () => {

            setLoading(true);

            const { data, error } = await supabase
                .from('clips')
                .select('*')
                .eq('creator', userId)
                .order('creation_date', { ascending: false });

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
        <div>
            <h4 className="mb-2">Clips</h4>
            {clips.length === 0 ? (
                <p>No clips available.</p>
            ) : (
                <div>
                    {clips.map((clip, key) => (
                        <ClipPlayer clip={clip} key={key} />
                    ))}
                </div>
            )}
        </div>
    );
};