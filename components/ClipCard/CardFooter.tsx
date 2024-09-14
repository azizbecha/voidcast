import { motion } from "framer-motion"
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa"
import { FaHeart, FaShare } from "react-icons/fa6"

interface Props {
    isPlaying: boolean,
    playAudio: () => void,
    pauseAudio: () => void,
}

export const CardFooter: React.FC<Props> = ({ isPlaying, playAudio, pauseAudio }) => {
    return (
        <div className="flex justify-between mt-4">
            <motion.div
                whileTap={{ scale: 1.2 }}
                className="w-14 h-14 p-3 rounded-full bg-accent flex justify-center items-center text-white text-3xl cursor-pointer"
            >
                <FaHeart />
            </motion.div>

            <motion.div
                whileTap={{ scale: 1.2 }}
                className="w-14 h-14 p-3 rounded-full bg-accent flex justify-center items-center text-white text-3xl cursor-pointer"
                onClick={() => (isPlaying ? pauseAudio() : playAudio())}
            >
                {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
            </motion.div>

            <motion.div
                whileTap={{ scale: 1.2 }}
                className="w-14 h-14 p-3 rounded-full bg-accent flex justify-center items-center text-white text-3xl cursor-pointer"
            >
                <FaShare />
            </motion.div>
        </div>
    )
}