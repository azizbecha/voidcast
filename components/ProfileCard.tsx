"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

import moment from "moment";

import { Button } from "./ui/Button";

import { FaPen } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";

interface Props {
    user: User | null;
}

const supabase = createClient();

export const ProfileCard: React.FC<Props> = ({ user }) => {
    const [profileData, setProfileData] = useState<any>(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            if (user) {
                const { data, error } = await supabase
                    .from("profiles")
                    .select(`*`)
                    .eq("id", user.id)
                    .single(); // Use single() since we're expecting a single profile

                setProfileData(data);
            }
        };

        fetchProfileData();
    }, [user]);

    return (
        <div className="bg-primary-800 rounded-md p-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Image
                        src={user?.user_metadata.avatar_url || "/images/logo.png"}
                        className="rounded-full border-none border-accent"
                        alt="User Avatar"
                        width={60}
                        height={60}
                    />

                    <div className="ml-2">
                        <div className="flex flex-row space-x-1.5 items-center justify-start">
                            <span className="font-semibold">{user?.user_metadata.full_name}</span>
                            {profileData?.verified && (
                                <MdVerified className="text-blue-500" size={15} />
                            )}
                        </div>

                        <p className="text-primary-300 text-sm">@{profileData?.username}</p>
                    </div>
                </div>
                <Link href={`u/${profileData?.username}`}>
                    <div className="flex justify-center items-center hover:bg-primary-600 p-2 rounded-full">
                        <FaPen />
                    </div>
                </Link>
            </div>

            <p className="text-primary-100 font-semibold mt-2">{profileData?.bio}</p>
            <p className="text-xs text-primary-300">Member since {moment(profileData?.created_at).format("MMMM DD, YYYY")}</p>

            <Link href={'profile'}>
                <Button color="primary" size="small" >Go to profile</Button>
            </Link>
        </div>
    );
};
