import { Metadata, NextPage } from "next";

import { createClient } from "@/utils/supabase/server";

import WithAuth from "@/components/Auth/WithAuth";

import Navbar from "@/components/ui/Navbar";

import { GridProvider } from "@/components/ui/Grid/GridProvider";
import { LeftColumn } from "@/components/ui/Grid/LeftColumn";
import { MiddleColumn } from "@/components/ui/Grid/MiddleColumn";
import { RightColumn } from "@/components/ui/Grid/RightColumn";

import { UsersList } from "@/components/UsersList";
import { ProfileCard } from "@/components/ProfileCard";
import { SavedClips } from "./SavedClips";

import { Loader } from "@/components/ui/Loader";

export const metadata: Metadata = {
    title: "Saved Clips • VoidCast",
}

const supabase = createClient();

const Saved: NextPage = async () => {

    const { data: { user } } = await supabase.auth.getUser();

    return (
        <WithAuth>
            <Navbar user={user} />
            <GridProvider>
                <LeftColumn>
                    <h3 className="text-white mb-4">People</h3>
                    <UsersList />
                </LeftColumn>
                <MiddleColumn>
                    {user ? <SavedClips id={user?.id} /> : <Loader />}
                </MiddleColumn>
                <RightColumn>
                    <ProfileCard user={user} />
                </RightColumn>
            </GridProvider>
        </WithAuth>
    )
}

export default Saved;