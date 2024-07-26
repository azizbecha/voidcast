import WithAuth from "@/components/Auth/WithAuth";
import { Button } from "@/components/Button";
import Navbar from "@/components/Navbar";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import Image from "next/image";

export default async function Profile() {

    const {
        data: { user },
        error,
    } = await createSupabaseServerClient().auth.getUser();

    console.log(error);

    return (
        <WithAuth>
            <Navbar />
            <div className="bg-primary-900 text-white h-screen flex items-center justify-center p-2 sm:px-7 sm:py-5">
                <main className="h-full w-full flex items-center justify-center px-2">
                    <div className="w-full sm:w-6/12 p-6 bg-primary-800 rounded-lg">
                        <img src={user?.user_metadata.avatar_url} className="w-28 h-28 rounded-full" />
                        <h4>{user?.user_metadata.full_name}</h4>
                        <span className="text-primary-300">@{user?.user_metadata.user_name}</span>
                        <Button>Log out</Button>
                    </div>
                </main>
            </div>
        </WithAuth>
    );
}