import WithAuth from "@/components/Auth/WithAuth";
import Navbar from "@/components/ui/Navbar";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {

  const supabase = createClient();
  const {
    data: { user },
    error,
} = await supabase.auth.getUser();

  console.log(user);

  return (
    <WithAuth>
      <Navbar />
      <div className="bg-primary-900 text-white h-screen flex items-center justify-center">
        <main className="h-full w-full flex items-center justify-center">
          <section className="hero py-20 w-full flex items-center justify-center">
            <div className="container mx-auto text-center">
              <h2 className="text-5xl font-bold mb-4 text-accent">Welcome to VoidCast 🚀</h2>
              <p className="text-xl mb-8 px-5">
                Thank you for joining our early access beta!<br />
                As one of our early users, you will have exclusive access to all the new features and updates. <br />
                We greatly appreciate your support and feedback during this exciting phase.
              </p>
            </div>
          </section>
        </main>
      </div>
    </WithAuth>
  );
}
