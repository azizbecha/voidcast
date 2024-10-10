import { Clip } from "@/interfaces";
import moment from "moment";
import { FaClock, FaPlay } from "react-icons/fa6";

interface Props {
    clip: Clip;
}

export const ClipPlayer: React.FC<Props> = ({ clip }) => {
    return (
        <div key={clip.id} className="bg-primary-700 p-3 mb-2 rounded-md">
            <p className="text-lg font-bold">{clip.title}</p>
            <p className="text-sm my-2">{clip.description}</p>

            <div className="flex justify-between items-center">
                <span className="flex gap-1 items-center text-sm"><FaPlay /> {clip.plays} plays</span>
                <span className="flex gap-1 items-center text-sm"><FaClock /> {moment(clip.created_at).fromNow()}</span>
            </div>
        </div>
    );
}