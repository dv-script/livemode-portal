import { User, Tooltip } from "@nextui-org/react";
import { getAllUsers } from "@/actions/get-all-users";
import { EditUserModal } from "@/components/edit-user-modal";
import { formatDate } from "@/utils/formatDate";
import { DeleteUserModal } from "./delete-user-modal";
import { IUser } from "@/types/IUser";

export async function UsersTable() {
  const users = (await getAllUsers()) as IUser[];

  return (
    <table>
      <thead className="sticky top-0 bg-white z-10 whitespace-nowrap text-left text-semibold text-sm font-semibold text-zinc-400 align-bottom">
        <tr>
          <th className="pb-3 uppercase text-start min-w-[175px] bg-white sticky left-0">
            USER
          </th>
          <th className="pb-3 uppercase text-start">COMPANY</th>
          <th className="pb-3 uppercase pr-2 text-start">PHONE NUMBER</th>
          <th className="pb-3 uppercase text-start min-w-[175px]">ROLES</th>
          <th className="pb-3 uppercase text-start min-w-[175px]">
            CREATED AT
          </th>
          <th className="pb-3 uppercase text-start min-w-[175px]">
            UPDATED AT
          </th>
          <th className="pb-3 uppercase text-start">STATUS</th>
          <th className="pb-3 uppercase text-start">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          const statusValidation =
            (user.status === "active" && "bg-blue-500") ||
            (user.status === "inactive" && "bg-red-500") ||
            (user.status === "paused" && "bg-yellow-500");

          return (
            <tr key={user.id} className="border-b last:border-none">
              <td className="pr-4 py-2 bg-white left-0 sticky">
                <div>
                  <User
                    avatarProps={{
                      radius: "full",
                      name: user.firstName[0] + user.lastName[0],
                      color: "primary",
                    }}
                    description={user.email}
                    name={user.firstName + " " + user.lastName}
                  >
                    {user.email}
                  </User>
                </div>
              </td>
              <td className="pr-4 py-2">
                <span className="text-sm">{user.company}</span>
              </td>
              <td className="pr-4 py-2">
                <span className="text-sm">{user.phoneNumber}</span>
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
                <span className="text-sm">{formatDate(user.createdAt)}</span>
              </td>
              <td
                className={
                  user.updatedAt !== null
                    ? "text-left pr-4 py-2"
                    : "text-center"
                }
              >
                {user.updatedAt !== null ? (
                  <span className="text-sm flex flex-col gap-2">
                    {formatDate(user.updatedAt)}
                    {user.updatedBy && (
                      <span className="inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs font-medium w-fit">
                        by: {user.updatedBy.split("@")[0]}
                      </span>
                    )}
                  </span>
                ) : (
                  <span className="text-sm">-</span>
                )}
              </td>
              <td className="pr-4 py-2">
                <div className="flex gap-2 items-center">
                  <span
                    className={`inline-block rounded-full w-2 h-2 ${statusValidation}`}
                  />
                  <span className="text-sm capitalize">{user.status}</span>
                </div>
              </td>
              <td className="py-2">
                <div className="relative flex items-center justify-center gap-2">
                  <Tooltip
                    className="bg-zinc-700 text-white b-2 border-zinc-100"
                    content="Edit user"
                  >
                    <div className="flex items-center justify-center">
                      <EditUserModal user={user} />
                    </div>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete user">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteUserModal
                        firstName={user.firstName}
                        id={user.id}
                        lastName={user.lastName}
                      />
                    </span>
                  </Tooltip>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
