import Image from "next/image"

import moment from "moment"

import { Button } from "./ui/Button"

import { FaUserPlus } from "react-icons/fa6"
import { FaBirthdayCake } from "react-icons/fa"
import { MdVerified } from "react-icons/md"

import { UserProfile } from "@/interfaces"

interface Props {
    user: UserProfile
}

export const UserCard: React.FC<Props> = ({ user }) => {
    return (
        <div className="gap-2 transition bg-primary-900 p-3 rounded-md">
            <div className="flex justify-between gap-2 w-full">
                <div className="flex items-center gap-2">
                    <Image src={user.avatar} className="rounded-full" alt={user.full_name} width={50} height={50} />
                    <div className="flex flex-col">
                        <div className="flex flex-row space-x-1.5 items-center justify-start">
                            <span className="font-semibold">{user.full_name}</span>
                            {user.verified && (
                                <MdVerified className="text-blue-500" size={15} />
                            )}
                        </div>
                        <p className="text-base text-primary-300">@{user.username}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <Button size="small" icon={<FaUserPlus />}>Follow</Button>
                </div>
            </div>

            <div className="mt-3">
                <p className="mb-1 text-primary-100">{user.bio}</p>

                {user.verified && (
                    <p className="text-primary-300 flex flex-row items-center justify-start gap-1"><MdVerified /> Verified user</p>
                )}

                <p className="text-primary-300 flex flex-row items-center justify-start gap-1"><FaBirthdayCake /> Member since {moment(user.created_at).format("DD MMMM YYYY")}</p>
            </div>
        </div>
    )
}