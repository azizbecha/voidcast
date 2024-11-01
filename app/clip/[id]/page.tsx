import { Metadata } from "next";

import { createClient } from "@/utils/supabase/server";

import WithAuth from "@/components/Auth/WithAuth";
import Navbar from "@/components/ui/Navbar";

import { GridProvider } from "@/components/ui/Grid/GridProvider";
import { LeftColumn } from "@/components/ui/Grid/LeftColumn";
import { MiddleColumn } from "@/components/ui/Grid/MiddleColumn";
import { RightColumn } from "@/components/ui/Grid/RightColumn";

import { UsersList } from "@/components/UsersList";
import { ProfileCard } from "@/components/ProfileCard";
import ClipCard from "@/components/ClipCard";

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const supabase = createClient();
    const { id } = params;

    // Fetch the profile based on the username from the URL
    const { data: clip } = await supabase
        .from('clips')
        .select(`
            *,
            profiles (
              full_name,
              username,
              avatar,
              verified
            )
        `)
        .eq('id', id)
        .single();

    if (!clip) {
        return {
            title: 'Clip Not Found',
            description: 'The requested clip could not be found.',
        };
    }

    return {
        title: `${clip.title} • VoidCast`,
        description: `${clip.description}`,
        openGraph: {
            title: `${clip.title} • VoidCast`,
            description: `${clip.description}`,
            url: `/clip/${clip.id}`,
            images: [
                {
                    url: '../../../logo.png',
                },
            ],
        },
    };
}

// The params argument to extract the username from the URL
export default async function Profile({ params }: { params: { id: string } }) {
    const supabase = createClient();
    const { id } = params;

    // Fetch the profile based on the username from the URL
    const { data: clip, error: clipError } = await supabase
        .from('clips')
        .select(`
            *,
            profiles (
              full_name,
              username,
              avatar,
              verified
            )
        `)
        .eq('id', id) // Fetch user by username from the profiles table
        .single();

    if (clipError) {
        console.error('Error fetching clip:', clipError);
        return <div>Error loading clip details</div>;
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
                        <div className="h-full overflow-y-scroll">
                            <ClipCard clipData={clip} isActive={true} />
                        </div>
                    </MiddleColumn>
                    <RightColumn>
                        <ProfileCard user={user} />
                    </RightColumn>
                </GridProvider>
            </div>
        </>
    );
}
