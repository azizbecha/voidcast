import { createSupabaseServerComponentClient } from "@/lib/supabase/server-client";
import { Button } from "./Button"
import { Input } from "./Input"
import LogoutButton from "./logout-button";
import Link from "next/link";

const Navbar = async () => {

    const {
        data: { user },
        error,
    } = await createSupabaseServerComponentClient().auth.getUser();

    return (
        <nav className="bg-primary-900 px-4 py-2 flex justify-between items-center">
            <div className="flex items-center">
                <img src="/logo.png" alt="Logo" className="h-6 w-6 mr-2" />
                <span className="text-red-500 font-bold text-xl">VoidCast</span>
            </div>
            <div className="flex-grow mx-4">
                <Input placeholder="Search for podcasts, rooms, clips or users" />
            </div>
            <div className="flex items-center space-x-4">
                {/* <FaVolumeUp className="text-white" />
                <FaComments className="text-white" />
                <FaBell className="text-white" />*/}
                {user ? <LogoutButton /> : <Link href={"/login"}><Button>Login</Button></Link>}
                {/* <DetailsButtonServer /> */}
                {
                    user && <img
                        src={user.user_metadata.avatar_url}
                        alt="Profile"
                        className="h-6 w-6 rounded-full"
                    />
                }
            </div>
        </nav>
    )
}

export default Navbar