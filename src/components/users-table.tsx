import { User, Tooltip } from "@nextui-org/react";
import { getAllUsers } from "@/actions/get-all-users";
import { EditUserModal } from "@/components/edit-user-modal";
import { TbTrash } from "react-icons/tb";
import { formatDate } from "@/utils/formatDate";

interface IUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  company: string;
  roles: string[];
  created_at: Date;
  updated_at: Date;
}

export async function UsersTable() {
  const users = (await getAllUsers()) as IUser[];
  
  return (
    <table>
      <thead className="sticky top-0 bg-white z-10 whitespace-nowrap text-left text-semibold text-sm font-semibold text-zinc-400 align-bottom">
        <tr>
          <th className="pb-3 text-start min-w-[175px]">USER</th>
          <th className="pb-3 text-start min-w-[175px]">COMPANY</th>
          <th className="pb-3 text-start min-w-[175px]">ROLES</th>
          <th className="pb-3 text-start min-w-[175px]">CREATED AT</th>
          <th className="pb-3 text-start min-w-[175px]">UPDATED AT</th>
          <th className="pb-3 text-start">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="border-b last:border-none">
            <td className="pr-4 py-2">
              <User
                avatarProps={{
                  radius: "full",
                  name: user.first_name[0],
                  color: "primary"
                }}
                description={user.email}
                name={user.first_name + " " + user.last_name}
              >
                {user.email}
              </User>
            </td>
            <td className="pr-4 py-2">
              <span className="text-sm">{user.company}</span>
            </td>
            <td className="pr-4 py-2">
              {user.roles.map((role, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs font-medium m-1"
                >
                  {role}
                </span>
              ))}
            </td>
            <td className="pr-4 py-2">
              <span className="text-sm">{formatDate(user.created_at)}</span>
            </td>
            <td className={user.updated_at !== null ? 'text-left' : 'text-center'}>
              <span className="text-sm">
                {user.updated_at !== null ? formatDate(user.updated_at) : "-"}
              </span>
            </td>
            <td>
              <div className="relative flex items-center gap-2">
                <Tooltip className="bg-zinc-700 text-white b-2 border-zinc-100" content="Edit user">
                  <div className="flex items-center justify-center">
                    <EditUserModal user={user} />
                  </div>
                </Tooltip>
                <Tooltip color="danger" content="Delete user">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <TbTrash />
                  </span>
                </Tooltip>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
