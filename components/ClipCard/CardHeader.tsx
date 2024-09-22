import Image from "next/image"
import moment from "moment"
import { FaPlay } from "react-icons/fa6"
import { MdVerified } from "react-icons/md"

interface Props {
    avatar: string,
    name: string,
    verified: boolean,
    createdAt: string,
    plays: number
}

export const CardHeader: React.FC<Props> = (props) => {
    const { avatar, name, verified, createdAt, plays } = props;

    return (
        <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
                <Image
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                    src={avatar}
                    alt={name}
                />
                <div className="text-white flex flex-col">
                    <div className="flex flex-row space-x-1.5 items-center justify-start">
                        <span className="font-semibold">{name}</span>
                        {verified && (
                            <MdVerified className="text-blue-500" size={15} />
                        )}
                    </div>
                    <span className="text-sm text-primary-300">
                        {moment(createdAt).fromNow()}
                    </span>
                </div>
            </div>
            <div className="flex items-center space-x-1">
                <FaPlay />
                <span>{plays} plays</span>
            </div>
        </div>
    )
}