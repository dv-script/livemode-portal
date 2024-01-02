import { logout } from "@/actions/logout";
import { LuLogOut } from "react-icons/lu";

export function UserLogout() {
    return (
        <form action={logout} className="w-full">
            <button type="submit" className="w-full flex items-center gap-2 text-left rounded-lg px-4 py-2 transition hover:bg-red-100 hover:text-red-700">
                <LuLogOut />
                Sign Out
            </button>
        </form>
    )
}