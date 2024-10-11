import { Metadata } from "next";
import Image from "next/image";

import { createClient } from "@/utils/supabase/server";

import WithAuth from "@/components/Auth/WithAuth";
import Navbar from "@/components/ui/Navbar";

import { Button } from "@/components/ui/Button";

import { GridProvider } from "@/components/ui/Grid/GridProvider";
import { LeftColumn } from "@/components/ui/Grid/LeftColumn";
import { MiddleColumn } from "@/components/ui/Grid/MiddleColumn";
import { RightColumn } from "@/components/ui/Grid/RightColumn";

import { UsersList } from "@/components/UsersList";
import { ProfileTabs } from "@/components//ProfileTabs";

import { FaEdit } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
    const supabase = createClient();
    const { username } = params;

    // Fetch the profile based on the username from the URL
    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, username, bio, avatar')
        .eq('username', username)
        .single();

    if (!profile) {
        return {
            title: 'User Not Found',
            description: 'The requested user profile could not be found.',
        };
    }

    return {
        title: `${profile.full_name} (@${profile.username}) • VoidCast`,
        description: profile.bio || `${profile.full_name}'s VoidCast profile`,
        openGraph: {
            title: `${profile.full_name} (@${profile.username})`,
            description: profile.bio || `${profile.full_name}'s profile details.`,
            url: `/u/${profile.username}`,
            type: 'profile',
            images: [
                {
                    url: profile?.avatar,
                    alt: `${profile.full_name}'s avatar`,
                },
            ],
        },
    };
}

// The params argument to extract the username from the URL
export default async function Profile({ params }: { params: { username: string } }) {
    const supabase = createClient();
    const { username } = params;

    // Fetch the profile based on the username from the URL
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username) // Fetch user by username from the profiles table
        .single();

    if (profileError) {
        console.error('Error fetching profile:', profileError);
        return <div>Error loading profile details</div>;
    }

    // Get the authenticated user (for Navbar or user-specific features)
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        console.error('Error fetching user:', userError);
    }

    return (
        <>
            <div className="h-screen bg-primary-900 w-full">
                <Navbar user={user} />
                <GridProvider>
                    <LeftColumn>
                        <h3 className="text-white mb-4">People</h3>
                        <UsersList />
                    </LeftColumn>
                    <MiddleColumn>
                        <div className="w-full mx-auto bg-primary-800 text-white rounded-lg overflow-hidden shadow-lg">
                            {/* Background Image */}
                            <div
                                className="relative h-48"
                                style={{
                                    backgroundImage: 'url(../../images/profile-cover.png)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <FaEdit size={18} color="#fff" className="right-0 absolute m-2 z-10" />
                                <div className="absolute inset-0 bg-black opacity-20"></div>
                            </div>

                            <div className="flex px-1.5 sm:px-3 justify-between w-full">
                                <div className="sm:w-1/6 w-2/6 sm:mr-3">
                                    <div className="flex justify-start -mt-3">
                                        {/* Profile Picture */}
                                        <Image
                                            src={profile?.avatar}
                                            alt="Profile"
                                            className="z-10 rounded-full border-4 border-primary-800 object-cover"
                                            width={90}
                                            height={90}
                                        />
                                    </div>
                                </div>
                                <div className="sm:w-5/6 w-4/6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col py-3">
                                            <div className="flex flex-row space-x-2 items-center justify-start">
                                                <h4 className="text-md sm:text-2xl font-bold">{profile?.full_name}</h4>
                                                {profile?.verified && (
                                                    <MdVerified className="text-blue-500" size={18} />
                                                )}
                                            </div>
                                            <span className="text-primary-300 text-sm sm:text-base font-semibold mt-0.5">@{profile?.username}</span>
                                        </div>
                                        <Button size="small" icon={<FaUserPlus />}>Follow</Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ProfileTabs profile={profile} />
                    </MiddleColumn>
                    <RightColumn>
                        <div className="text-white">
                            <h3 className="mb-4">Right Col</h3>
                        </div>
                    </RightColumn>
                </GridProvider>
            </div>
        </>
    );
}
