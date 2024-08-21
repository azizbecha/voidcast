import AudioTrimmer from "@/components/AudioTrimmer";
import WithAuth from "@/components/Auth/WithAuth"
import Container from "@/components/Container";
import Navbar from "@/components/ui/Navbar"
import { createClient } from "@/utils/supabase/server";
import { FaScissors } from "react-icons/fa6";

const CreatePage = async () => {

    const supabase = createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    return (
        <>
            <div className="h-screen bg-primary-900 w-full">
                <Navbar user={user} />
                <Container>
                    <h1 className="text-white flex items-center gap-4"><FaScissors /> Create a new clip</h1>

                    <AudioTrimmer />
                </Container>
            </div>
        </>
    )
}

export default CreatePage