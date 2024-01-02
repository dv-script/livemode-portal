import Link from "next/link";

export default function Admin() {
    return (
        <div className="flex items-center justify-center py-20 px-4 min-h-screen background">
            <div className="bg-white px-24 py-52 flex flex-col rounded-lg">
                <Link href="/admin/add-a-new-user" className="bg-green-500 text-white px-4 py-2 rounded-lg transition-colors hover:bg-green-600">
                    Add a new user
                </Link>
            </div>
        </div>
    )
}