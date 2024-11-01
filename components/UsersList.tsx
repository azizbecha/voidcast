import Image from "next/image";
import Link from "next/link";

import { getUsers } from "@/utils/getUsers";
import { MdVerified } from "react-icons/md";

export const UsersList = async () => {
    const users = await getUsers();

    return (
        <div className="flex flex-col space-y-2 overflow-y-auto h-full">
            {
                users.map((user, key) => (
                    <Link href={`../../u/${user.username}`} key={key}>
                        <div className="flex items-center py-2 gap-2">
                            <Image src={user.avatar} className="rounded-full" alt={user.full_name} width={45} height={45} />
                            <div>
                                <div className="flex flex-row space-x-1.5 items-center justify-start">
                                    <span className="font-semibold">{user.full_name}</span>
                                    {user.verified && (
                                        <MdVerified className="text-blue-500" size={15} />
                                    )}
                                </div>
                                <p className="text-base text-primary-300">@{user.username}</p>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}