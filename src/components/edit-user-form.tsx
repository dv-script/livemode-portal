import { useFormState } from "react-dom";
import { editUser } from "@/actions/edit-user";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
} from "@nextui-org/react";

const allRoles = [
  { name: "B2B Portal", key: "b2b_portal" },
  { name: "Photo Database", key: "photo_database" },
  { name: "Commentary Live System", key: "commentary_live_system" },
  { name: "Costumer Service Tool", key: "costumer_service_tool" },
  { name: "Match Analysis Hub", key: "match_analysis_hub" },
  { name: "Media Portal", key: "media_portal" },
  { name: "Administrator", key: "admin" },
];

interface EditUserFormProps {
  onClose: () => void
    user: {
      id: string
      email: string
      first_name: string
      last_name: string
      company: string
      roles: string[]
      created_at: Date
      updated_at: Date
    }
}

export function EditUserForm({onClose, user} : EditUserFormProps) {
  const initialState = { message: null, errors: {} };
  //@ts-ignore
  const [state, dispatch] = useFormState(editUser, initialState);

  return (
    <form action={dispatch}>
      <ModalHeader className="flex flex-col gap-1">Edit User</ModalHeader>
      <ModalBody>
        <Input
          autoFocus
          label="Email"
          placeholder="Enter an email address"
          variant="bordered"
          defaultValue={user.email}
          name="email"
        />
        <Input
          label="First Name"
          placeholder="Enter the first name of the user"
          variant="bordered"
          defaultValue={user.first_name}
          name="firstName"
        />
        <Input
          label="Last Name"
          placeholder="Enter the last name of the user"
          variant="bordered"
          defaultValue={user.last_name}
          name="lastName"
        />
        <Input
          label="Company"
          placeholder="Enter the company name"
          variant="bordered"
          defaultValue={user.company}
          name="company"
        />
        <ul className="flex flex-col gap-2 py-2 px-1">
          {allRoles.map((role) => (
            <li key={role.key}>
              <Checkbox
                name="roles"
                value={role.key}
                defaultSelected={user.roles.includes(role.key)}
                classNames={{
                  label: "text-small",
                }}
              >
                {role.name}
              </Checkbox>
            </li>
          ))}
        </ul>
      </ModalBody>
      <ModalFooter>
        <Button type="reset" color="danger" variant="flat">
          Reset
        </Button>
        <Button type="submit" color="primary" onPress={onClose}>
          Confirm
        </Button>
      </ModalFooter>
    </form>
  );
}
