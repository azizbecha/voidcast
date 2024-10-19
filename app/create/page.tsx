import { Metadata } from "next";

import { createClient } from "@/utils/supabase/server";

import WithAuth from "@/components/Auth/WithAuth"

import AudioTrimmer from "@/components/AudioTrimmer";

import { GridProvider } from "@/components/ui/Grid/GridProvider";
import { LeftColumn } from "@/components/ui/Grid/LeftColumn";
import { MiddleColumn } from "@/components/ui/Grid/MiddleColumn";
import { RightColumn } from "@/components/ui/Grid/RightColumn";

import Navbar from "@/components/ui/Navbar"

import { UsersList } from "@/components/UsersList";

export const metadata: Metadata = {
    title: "Create • VoidCast",
};

const CreatePage = async () => {

    const supabase = createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    return (
        <WithAuth>
            <Navbar user={user} />
            <GridProvider>
                <LeftColumn>
                    <h3 className="text-white mb-4">People</h3>
                    <UsersList />
                </LeftColumn>
                <div className="md:block sm:col-span-9">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white">Create new clip</h3>
                    </div>
                    <AudioTrimmer />
                </div>
            </GridProvider>
        </WithAuth>
    )
}

export default CreatePage