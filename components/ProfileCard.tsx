"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

import { FaPen } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { UserProfile } from "@/interfaces";

interface Props {
    user: User | null;
}

const supabase = createClient();

export const ProfileCard: React.FC<Props> = ({ user }) => {
    const [profileData, setProfileData] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            if (user) {
                const { data, error } = await supabase
                    .from("profiles")
                    .select(`*`)
                    .eq("id", user.id)
                    .single(); // Use single() since we're expecting a single profile

                setProfileData(data as UserProfile);
            }
        };

        fetchProfileData();
    }, [user]);

    return (
        <div className="bg-primary-800 rounded-lg p-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        src={user?.user_metadata.avatar_url || "/images/logo.png"}
                        className="rounded-full border-none border-accent"
                        alt="User Avatar"
                        width={60}
                        height={60}
                    />

                    <div>
                        <div className="flex flex-row space-x-1.5 items-center justify-start">
                            <span className="font-bold text-base">{user?.user_metadata.full_name}</span>
                            {profileData?.verified && (
                                <MdVerified className="text-blue-500" size={15} />
                            )}
                        </div>

                        <p className="text-primary-300 text-sm font-medium">@{profileData?.username}</p>
                    </div>
                </div>
                <Link href='profile'>
                    <div className="flex justify-center items-center hover:bg-primary-600 p-2 rounded-full">
                        <FaPen />
                    </div>
                </Link>
            </div>

            <p className="text-primary-300 font-semibold text-sm line-h mt-2">{profileData?.bio}</p>
            <p className="text-accent text-md font-bold mt-2">{profileData?.url} </p>
        </div>
    );
};
