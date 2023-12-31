import { logout } from "@/actions/logout";
import { PiSignOut } from 'react-icons/pi';

export function UserLogout() {
    return (
        <form action={logout} className="h-full">
            <button type="submit" className="flex items-center gap-2 h-full text-gray-800 font-bold relative cursor-pointer hover:text-green-500 user-button">
                <PiSignOut size={26} />
                <span className="whitespace-nowrap text-sm leading-7 hidden md:block">Sign Out</span>
            </button>
        </form>
    )
}