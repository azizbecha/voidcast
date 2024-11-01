import Link from "next/link";

import { FaCompass, FaMagic } from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";

const items = [
    { label: "FYP", href: "/fyp", icon: FaMagic },
    { label: "Discover", href: "/discover", icon: FaCompass },
    { label: "Create", href: "/create", icon: FaScissors },
];

export default function NavigationItems() {
    return (
        <div className="space-x-1 hidden md:flex">
            {items.map((item, index) => (
                <Link href={item.href} key={index}>
                    <div className="rounded-full p-2 bg-primary-600 text-white">
                        <item.icon />
                    </div>
                </Link>
            ))}
        </div>
    );
}
