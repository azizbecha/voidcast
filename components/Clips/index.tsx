import { createClient } from "@/lib/supabase/client";
import { Clip } from "@/interfaces";

export const Clips = async () => {
  const supabase = await createClient();
  const { data } = (await supabase
    .from("clips")
    .select("*")
    .order("created_at", { ascending: false })) as {
    data: Clip[] | null;
  };

  return (
    <div className="max-h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
      {data?.map((clip) => (
        <div
          key={clip.id}
          className="snap-start mmin-h-screeen flex flex-col justify-center border w-full bg-primary-800 p-4"
        >
          <h4 className="text-xl font-bold">{clip.title}</h4>
          <p className="mt-2">{clip.description}</p>
          <audio className="w-full mt-4" controls src={clip.audiofile}></audio>
        </div>
      ))}
    </div>
  );
};
