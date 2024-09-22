import AudioTrimmer from "@/components/AudioTrimmer";
import WithAuth from "@/components/Auth/WithAuth"
import ClipsScroller from "@/components/ClipsScroller";
import Container from "@/components/Container";
import { Button } from "@/components/ui/Button";
import { GridProvider } from "@/components/ui/Grid/GridProvider";
import { LeftColumn } from "@/components/ui/Grid/LeftColumn";
import { MiddleColumn } from "@/components/ui/Grid/MiddleColumn";
import { RightColumn } from "@/components/ui/Grid/RightColumn";
import Navbar from "@/components/ui/Navbar"
import { UsersList } from "@/components/UsersList";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { FaScissors } from "react-icons/fa6";

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
                <MiddleColumn>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white">Create new clip</h3>
                    </div>
                    <AudioTrimmer />
                </MiddleColumn>
                <RightColumn>
                    <h3 className="text-white mb-4">Hello World</h3>
                    <div className="bg-primary-800 p-4 rounded-lg">
                        <p>im too tired to complete working on this, thanks for understanding 👍</p>
                    </div>
                </RightColumn>
            </GridProvider>
        </WithAuth>
    )
}

export default CreatePage