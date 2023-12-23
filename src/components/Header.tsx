import logoImage from '../assets/logoImage.png';
import { PiQuestion } from 'react-icons/pi';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
    return (
        <header className="w-full h-16 bg-white">
            <div className="h-full max-w-[1300px] mx-auto bg-white text-gray-800 flex justify-between items-center gap-8 px-4">
                <Link href="/" className="flex items-center justify-center h-full">
                    <Image src={logoImage} alt='Livemode Logo' className="h-12 object-contain" />
                </Link>

                <div className="flex items-center justify-center h-full gap-8">
                    <Link href="/" className="flex items-center gap-2 h-full text-gray-800 font-bold relative cursor-pointer hover:text-green-500 user-button">
                        <PiQuestion size={26} />
                        <span className="whitespace-nowrap text-sm leading-7 hidden md:block">Help & Contact</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}
