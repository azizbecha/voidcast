import { Metadata } from "next";

import { createClient } from "@/utils/supabase/server";

import WithAuth from "@/components/Auth/WithAuth"

import Navbar from "@/components/ui/Navbar"

import AudioTrimmer from "@/components/AudioTrimmer";

import { GridProvider } from "@/components/ui/Grid/GridProvider";
import { LeftColumn } from "@/components/ui/Grid/LeftColumn";

import { UsersList } from "@/components/UsersList";
import CategorySelector from "./CategorySelector";

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
                <div className="md:block sm:col-span-9 px-2 mt-3 sm:mt-0 sm:p-0 h-[80vh]">
                    <AudioTrimmer />
                </div>
            </GridProvider>
        </WithAuth>
    )
}

export default CreatePage