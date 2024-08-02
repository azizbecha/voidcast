import WithAuth from "@/components/Auth/WithAuth"
import Navbar from "@/components/ui/Navbar"
import { createClient } from "@/utils/supabase/server";

const CreatePage = async () => {

    const supabase = createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    return (
        <WithAuth>
            <div className="h-screen bg-primary-900 w-full">
                <Navbar user={user} />
                <h1>Create a new clip</h1>
            </div>
        </WithAuth>
    )
}

export default CreatePage