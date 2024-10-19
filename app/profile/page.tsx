import { Metadata } from "next";

import { createClient } from "@/utils/supabase/server";

import WithAuth from "@/components/Auth/WithAuth";
import Navbar from "@/components/ui/Navbar";
import { GridProvider } from "@/components/ui/Grid/GridProvider";

import { MyProfileTabs } from "./MyProfileTabs";

export const metadata: Metadata = {
    title: "Edit profile • VoidCast",
};

export default async function Profile() {
    const supabase = createClient();

    // Fetch the user and profile information server-side
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
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
                    <MyProfileTabs profile={profile} />
                </GridProvider>
            </div>
        </WithAuth>
    );
}
