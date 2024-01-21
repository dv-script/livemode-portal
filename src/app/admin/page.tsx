import Link from "next/link";
import { UsersTable } from "@/components/users-table";
import { Button } from "@nextui-org/react";

export default function Admin() {
  return (
    <div className="flex p-4 min-h-screen background">
      <div className="mx-auto flex flex-col gap-4 max-w-[1300px] overflow-hidden">
        <div className="bg-white flex flex-col rounded-lg p-3 w-full h-full">
          <div className="flex gap-4 items-center">
            <Button
              as={Link}
              href="/admin/add-a-new-user"
              radius="full"
              color="primary"
              isIconOnly
            >
              +
            </Button>
            <h2>Add new user</h2>
          </div>
          <div className="flex flex-col mt-4 overflow-x-auto">
            <UsersTable />
          </div>
        </div>
      </div>
    </div>
  );
}
