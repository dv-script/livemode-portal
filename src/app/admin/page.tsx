import Link from "next/link";
import { UsersTable } from "@/components/users-table";

export default function Admin() {
    return (
        <div className="flex p-4 min-h-screen background">
            <div className="mx-auto flex flex-col gap-4 max-w-[1300px]">
                <div className="bg-white flex flex-col rounded-lg p-3 w-full lg:w-1/2">
                    <div className="flex gap-4 items-center">
                    <Link href="/admin/add-a-new-user" className="bg-green-500 w-fit text-white px-4 py-2 rounded-full transition-colors hover:bg-green-600">
                        +
                    </Link>
                    <h2>Users</h2>
                    </div>
                    <div className="flex flex-col mt-4 overflow-x-auto">
                        <UsersTable />
                    </div>
                </div>
            </div>
        </div>
    )
}