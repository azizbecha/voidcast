import WithAuth from "@/components/Auth/WithAuth";
import { Button } from "@/components/ui/Button";
import Navbar from "@/components/ui/Navbar";
import { createClient } from "@/utils/supabase/server";

export default async function Profile() {

    const supabase = createClient();

    const {
        data: { user },
        error,
    } = await createClient().auth.getUser();

    console.log(error);

    return (
        <WithAuth>
            <div className="h-screen bg-primary-900 w-full">
                <Navbar />
                <div className="w-full mx-auto px-2 sm:px-5.5">
                    <div className="grid grid-cols-1 md:grid-cols-12 h-screen">
                        {/* Left Column */}
                        <div className="hidden md:block sm:col-span-3 mr-4 border">
                            <h3 className="text-white">Online</h3>
                        </div>

                        {/* Middle Column */}
                        <div className="col-span-1 sm:col-span-6 bg-gray-800 p-4 rounded">
                            <img src={user?.user_metadata.avatar_url} className="w-28 h-28 rounded-full" />
                            <h4>{user?.user_metadata.full_name}</h4>
                            <span className="text-primary-300">@{user?.user_metadata.user_name}</span>
                            <Button>Log out</Button>
                        </div>

                        {/* Right Column */}
                        <div className="hidden sm:block sm:col-span-3 p-4 rounded ml-4 border">

                        </div>
                    </div>
                </div>
            </div>
        </WithAuth>
    );
}