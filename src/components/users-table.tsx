import { User, Tooltip } from "@nextui-org/react";
import { getAllUsers } from "@/actions/get-all-users";
import { LuEye } from "react-icons/lu";
import { PiPencilSimpleLine } from "react-icons/pi";
import { TbTrash } from "react-icons/tb";
import { formatDate } from "@/utils/formatDate";

interface IUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  company: string;
  roles: string[];
  created_at: Date;
  updated_at: Date;
}

export async function UsersTable() {
  const users = (await getAllUsers()) as IUser[];

  return (
    <table>
      <thead className="whitespace-nowrap text-left text-semibold text-sm font-semibold text-zinc-400 align-bottom">
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
            <td className="pr-4">
              <User
                avatarProps={{
                  radius: "full",
                  src: "https://github.com/dv-script.png",
                }}
                description={user.email}
                name={user.first_name + " " + user.last_name}
              >
                {user.email}
              </User>
            </td>
            <td className="pr-4">
              <span>{user.company}</span>
            </td>
            <td className="pr-4">
              {user.roles.map((role, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs font-medium m-1"
                >
                  {role}
                </span>
              ))}
            </td>
            <td className="pr-4">
              <span>{formatDate(user.created_at)}</span>
            </td>
            <td className={user.updated_at !== null ? 'text-left' : 'text-center'}>
              <span>
                {user.updated_at !== null ? formatDate(user.updated_at) : "-"}
              </span>
            </td>
            <td>
              <div className="relative flex items-center gap-2">
                <Tooltip content="Edit user">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <PiPencilSimpleLine />
                  </span>
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
