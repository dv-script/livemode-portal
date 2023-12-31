import { auth } from "@/app/auth/providers";
import { PiQuestion, PiLockKey } from 'react-icons/pi';
import logoImage from '../assets/logoImage.png';
import Image from 'next/image';
import Link from 'next/link';
import { UserLogout } from "./UserLogout";

export async function Header() {
    const session = await auth();

    return (
        <header className="w-full h-16 dark:bg-zinc-900 dark:bg-opacity-80 bg-zinc-100 fixed">
            <div className="h-full max-w-[1300px] mx-auto flex justify-between items-center gap-8 px-4">
                <Link href="/" className="flex items-center justify-center h-full">
                    <Image src={logoImage} alt='Livemode Logo' className="h-12 object-contain w-auto" priority />
                </Link>

                <div className="flex items-center justify-center h-full gap-8">
                    {session?.user.roles.includes('admin') && (
                        <Link href="/admin" className="flex items-center gap-2 h-full dark:text-zinc-100 relative cursor-pointer hover:text-green-500 user-button">
                            <PiLockKey size={26} />
                            <span className="whitespace-nowrap text-sm leading-7 hidden md:block">Admin</span>
                        </Link>
                    )}
                    <Link href="/" className="flex items-center gap-2 h-full dark:text-zinc-100 relative cursor-pointer hover:text-green-500 user-button">
                        <PiQuestion size={26} />
                        <span className="whitespace-nowrap text-sm leading-7 hidden md:block">Help & Contact</span>
                    </Link>
                    {session?.user && (
                        <UserLogout />
                    )}
                </div>
            </div>
        </header>
    )
}
