import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="flex items-center justify-start col-span-2 sm:col-span-3 space-x-2">
            <Image width={40} height={40} src="/images/logo.png" className="h-6 w-6" alt="VoidCast Logo" />
            <span className="self-center text-2xl font-bold whitespace-nowrap text-accent hidden md:block">
                VoidCast
            </span>
            <span className="hidden md:block bg-accent px-2 py-0.5 rounded-full text-xs text-white font-bold">BETA</span>
        </Link>
    );
}
