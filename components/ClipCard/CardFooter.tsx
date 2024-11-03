"use client";

import { useEffect, useState } from "react";

import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { FaPauseCircle, FaPlayCircle, FaHeart, FaShare, FaBookmark } from "react-icons/fa";
import { Loader } from "../ui/Loader";

import { base_url } from "@/lib/constants";

interface Props {
    isPlaying: boolean;
    playAudio: () => void;
    pauseAudio: () => void;
    id: string;
}

const supabase = createClient();

export const CardFooter: React.FC<Props> = ({ isPlaying, playAudio, pauseAudio, id }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(true); // New loading state

    // Fetch user data on component mount
    useEffect(() => {
        
        // Check if the clip is already saved
        const checkIfSaved = async (userId: string) => {
            const { data, error } = await supabase
                .from('savedClips')
                .select('id')
                .eq('clipId', id)
                .eq('saved_by', userId);
    
            if (error) {
                console.error("Error fetching saved clip:", error);
            } else {
                setIsSaved(data.length > 0);
            }
        };

        const fetchUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Error fetching user:", error);
            } else {
                setUser(user);
                if (user) {
                    await checkIfSaved(user.id);
                }
            }
            setLoading(false); // Set loading to false after user and saved status are checked
        };

        fetchUser();
    }, [id]);

    // Toggle save status of the clip
    const toggleSaveClip = async () => {
        if (!user) {
            toast.error("You must be logged in to save clips");
            return;
        }

        setLoading(true); // Start loading when toggling save status

        if (isSaved) {
            const { error } = await supabase
                .from('savedClips')
                .delete()
                .eq('clipId', id)
                .eq('saved_by', user?.id);

            if (error) {
                toast.error("Failed to unsave the clip");
            } else {
                setIsSaved(false);
                toast.success("Clip removed from saved");
            }
        } else {
            const { error } = await supabase
                .from('savedClips')
                .insert([{ clipId: id, saved_by: user.id }]);

            if (error) {
                toast.error("Failed to save the clip");
            } else {
                setIsSaved(true);
                toast.success("Clip saved successfully");
            }
        }
        setLoading(false); // End loading after saving process is complete
    };

    // Copy link function
    const copyLink = () => {
        const url = `${base_url}/clip/${id}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                toast.success("Link copied to clipboard");
            })
            .catch(() => {
                toast.error("Error copying link");
            });
    };

    return (
        <div className="flex justify-between mt-2 w-full">
            <div className="flex justify-center items-center flex-col gap-1.5">
                <motion.button
                    whileTap={{ scale: 1.2 }}
                    whileHover={{ scale: 1.1 }}
                    className="text-xl w-12 h-12 rounded-full bg-accent flex justify-center items-center text-white cursor-pointer"
                    onClick={() => (isPlaying ? pauseAudio() : playAudio())}
                >
                    {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
                </motion.button>
            </div>

            <div className="flex justify-between space-x-4">
                <div className="flex justify-center items-center flex-col gap-1.5">
                    <motion.button
                        whileTap={{ scale: 1.2 }}
                        whileHover={{ scale: 1.1 }}
                        className="text-xl w-12 h-12 rounded-full border-accent border-2 bg-transparent text-accent flex justify-center items-center cursor-pointer"
                    >
                        <FaHeart />
                    </motion.button>
                </div>

                <div className="flex justify-center items-center flex-col gap-1.5">
                    <motion.button
                        onClick={toggleSaveClip}
                        whileTap={{ scale: 1.2 }}
                        whileHover={{ scale: 1.1 }}
                        disabled={loading}
                        className={`flex justify-center items-center text-xl w-12 h-12 rounded-full border-2 border-accent ${loading ? 'bg-transparent' :
                            isSaved ? 'bg-accent text-white' : 'bg-transparent text-accent'
                            }`}
                    >
                        {loading ? (
                            <Loader size={4} />
                        ) : (
                            <FaBookmark />
                        )}
                    </motion.button>
                </div>

                <div className="flex justify-center items-center flex-col gap-1.5">
                    <motion.button
                        onClick={copyLink}
                        whileTap={{ scale: 1.2 }}
                        whileHover={{ scale: 1.1 }}
                        className="text-xl w-12 h-12 rounded-full border-2 border-accent bg-transparent flex justify-center items-center text-accent cursor-pointer"
                    >
                        <FaShare />
                    </motion.button>
                </div>
            </div>
        </div>
    );
};
