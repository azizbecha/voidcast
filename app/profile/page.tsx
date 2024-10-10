import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import WithAuth from "@/components/Auth/WithAuth";
import Navbar from "@/components/ui/Navbar";
import { AuthProviderBadge } from "@/components/ui/AuthProviderBadge";
import { GridProvider } from "@/components/ui/Grid/GridProvider";
import { LeftColumn } from "@/components/ui/Grid/LeftColumn";
import { MiddleColumn } from "@/components/ui/Grid/MiddleColumn";
import { RightColumn } from "@/components/ui/Grid/RightColumn";
import { UsersList } from "@/components/UsersList";
import { MdVerified } from "react-icons/md";
import { ProfileTabs } from "@/components/ui/ProfileTabs";
import { FaEdit } from "react-icons/fa";

export default async function Profile() {
    const supabase = createClient();

    // Get the authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        console.error('Error fetching user:', userError);
        return <div>Error loading profile</div>;
    }

    // Fetch user profile from profiles table
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id) // Assuming 'id' is the primary key for user profiles
        .single();

    if (profileError) {
        console.error('Error fetching profile:', profileError);
        return <div>Error loading profile details</div>;
    }

    return (
        <WithAuth>
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
                                    backgroundImage: `url('https://scontent.ftun10-1.fna.fbcdn.net/v/t39.30808-6/311714139_1440959433063552_5039381490098018431_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=0z4TEkGHxV8Q7kNvgH61TEv&_nc_ht=scontent.ftun10-1.fna&_nc_gid=A0rjKTekbpqSAc4FVK40mod&oh=00_AYChxmZdhBAi4K8LT3WDC4LxmVmxwYcfdjeCe3tWZgNZiA&oe=6707A3DE')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <FaEdit size={18} color="#fff" className="right-0 absolute m-2 z-10" />
                                <div className="absolute inset-0 bg-black opacity-40"></div>
                            </div>

                            <div className="flex px-4">
                                <div className="w-1/5">
                                    <div className="flex justify-start -mt-4">
                                        {/* Profile Picture */}
                                        <Image
                                            src={user?.user_metadata?.avatar_url}
                                            alt="Profile"
                                            className="z-10 rounded-full border-4 border-primary-800 object-cover"
                                            width={85}
                                            height={85}
                                        />
                                    </div>
                                </div>
                                <div className="w-4/5">
                                    <div className="flex items-end">
                                        <div className="flex flex-col py-3">
                                            <div className="flex flex-row space-x-2 items-center justify-start">
                                                <h4 className="text-2xl font-bold">{profile?.full_name}</h4>
                                                {profile?.verified && (
                                                    <MdVerified className="text-blue-500" size={18} />
                                                )}
                                            </div>
                                            <span className="text-primary-300 text-md font-semibold">@{profile?.username}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ProfileTabs user={user} profile={profile} />
                        {/* <div className="bg-primary-800 p-4 rounded-md mt-2">

                            <h4>About</h4>
                            
                            <div className="text-white mb-4">
                                <p><strong>Email:</strong> {user?.email}</p>
                                <p><strong>Bio:</strong> {profile?.bio}</p>
                                <p><strong>Location:</strong> {profile?.location}</p>
                            </div>
                        </div> */}
                    </MiddleColumn>
                    <RightColumn>
                        <div className="text-white">
                            <h3 className="mb-4">Right Col</h3>
                        </div>
                    </RightColumn>
                </GridProvider>
            </div>
        </WithAuth>
    );
}
