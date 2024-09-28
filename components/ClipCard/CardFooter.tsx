import { motion } from "framer-motion";
import { FaPauseCircle, FaPlayCircle, FaHeart, FaShare } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";

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
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 p-3 rounded-full bg-accent flex justify-center items-center text-white text-3xl cursor-pointer"
                    onClick={() => (isPlaying ? pauseAudio() : playAudio())}
                >
                    {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
                </motion.div>
            </div>

            <div className="flex justify-between space-x-4">
                <div className="flex justify-center items-center flex-col gap-1.5">
                    <motion.div
                        whileTap={{ scale: 1.2 }}
                        whileHover={{ scale: 1.1 }}
                        className="w-14 h-14 p-3 rounded-full border-2 border-accent bg-transparent flex justify-center items-center text-accent cursor-pointer"
                    >
                        <FaHeart />
                    </motion.div>
                </div>

                <div className="flex justify-center items-center flex-col gap-1.5">
                    <motion.div
                        whileTap={{ scale: 1.2 }}
                        whileHover={{ scale: 1.1 }}
                        className="w-14 h-14 p-3 rounded-full border-2 border-accent bg-transparent flex justify-center items-center text-accent cursor-pointer"
                    >
                        <FaBookmark />
                    </motion.div>
                </div>

                <div className="flex justify-center items-center flex-col gap-1.5">
                    <motion.div
                        whileTap={{ scale: 1.2 }}
                        whileHover={{ scale: 1.1 }}
                        className="w-14 h-14 p-3 rounded-full border-2 border-accent bg-transparent flex justify-center items-center text-accent cursor-pointer"
                    >
                        <FaShare />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
