import { motion } from "framer-motion";
import { FaPauseCircle, FaPlayCircle, FaHeart, FaShare } from "react-icons/fa";

interface Props {
    isPlaying: boolean;
    likesCount: number; // Total likes count
    isLiked: boolean; // Whether the user has liked the clip
    playAudio: () => void;
    pauseAudio: () => void;
    handleLike: () => void; // Handler to like the clip
}

export const CardFooter: React.FC<Props> = ({ isPlaying, likesCount, isLiked, playAudio, pauseAudio, handleLike }) => {
    return (
        <div className="flex justify-between mt-4">
            <div className="flex justify-center items-center flex-col gap-1.5">
                <motion.div
                    whileTap={{ scale: 1.2 }}
                    className="w-14 h-14 p-3 rounded-full bg-accent flex justify-center items-center text-white text-3xl cursor-pointer"
                    onClick={handleLike} // Handle like action
                >
                    <FaHeart color={isLiked ? "red" : "white"} />
                </motion.div>
                <span className="text-sm">{likesCount} likes</span> {/* Display total likes */}
            </div>

            <div className="flex justify-center items-center flex-col gap-1.5">
                <motion.div
                    whileTap={{ scale: 1.2 }}
                    className="w-14 h-14 p-3 rounded-full bg-accent flex justify-center items-center text-white text-3xl cursor-pointer"
                    onClick={() => (isPlaying ? pauseAudio() : playAudio())}
                >
                    {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
                </motion.div>
                <span className="text-sm">{isPlaying ? 'Pause' : 'Play'}</span>
            </div>

            <div className="flex justify-center items-center flex-col gap-1.5">
                <motion.div
                    whileTap={{ scale: 1.2 }}
                    className="w-14 h-14 p-3 rounded-full bg-accent flex justify-center items-center text-white text-3xl cursor-pointer"
                >
                    <FaShare />
                </motion.div>
                <span className="text-sm">Share</span>
            </div>
        </div>
    );
};
