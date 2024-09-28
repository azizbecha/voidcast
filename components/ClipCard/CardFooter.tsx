import { motion } from "framer-motion";
import { FaPauseCircle, FaPlayCircle, FaHeart, FaShare } from "react-icons/fa";

interface Props {
    isPlaying: boolean;
    playAudio: () => void;
    pauseAudio: () => void;
}

export const CardFooter: React.FC<Props> = ({ isPlaying, playAudio, pauseAudio }) => {
    return (
        <div className="flex justify-between mt-4">
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

            <div className="flex justify-between space-x-4">
                <div className="flex justify-center items-center flex-col gap-1.5">
                    <motion.div
                        whileTap={{ scale: 1.2 }}
                        className="w-14 h-14 p-3 rounded-full bg-accent flex justify-center items-center text-white text-3xl cursor-pointer"
                    >
                        <FaHeart color={"white"} />
                    </motion.div>
                    <span className="text-sm">Like</span> {/* Display total likes */}
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
        </div>
    );
};
