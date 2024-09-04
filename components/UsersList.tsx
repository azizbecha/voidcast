import Image from "next/image";
import Link from "next/link";

import { getUsers } from "@/utils/getUsers";

export const UsersList = async () => {
    const users = await getUsers();

    return (
        <div className="flex flex-col space-y-3">
            {
                users.map((user, key) => (
                    <Link href={`u/${user.username}`} key={key}>
                        <div className="flex items-center py-2 gap-2 hover:border-r transition">
                            <Image src={user.avatar} className="rounded-full" alt={user.full_name} width={45} height={45} />
                            <div>
                                <p>{user.full_name}</p>
                                <p className="text-base text-primary-300">@{user.username}</p>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}