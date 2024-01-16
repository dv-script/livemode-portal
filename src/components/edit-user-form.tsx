import { useFormState } from "react-dom";
import { editUser } from "@/actions/edit-user";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { FormError } from "./form-error";
import { useEffect } from "react";
import { allRoles } from "@/utils/constants/all-roles";
import { IUser } from "@/types/IUser";

const status = [
  {
    key: "active",
    color: "bg-blue-500",
    label: "Active",
  },
  {
    key: "inactive",
    color: "bg-red-500",
    label: "Inactive",
  },
  {
    key: "paused",
    color: "bg-yellow-500",
    label: "Paused",
  },
];

interface EditUserFormProps {
  onClose: () => void;
  user: IUser;
}

export function EditUserForm({ onClose, user }: EditUserFormProps) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(editUser, initialState);

  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [onClose, state.success]);

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
        {state.errors?.email &&
          state.errors.email.map((error) => (
            <p aria-live="polite" key={error} className="text-xs text-red-500">
              {error}
            </p>
          ))}
        <Input
          label="First Name"
          placeholder="Enter the first name of the user"
          variant="bordered"
          defaultValue={user.firstName}
          name="firstName"
        />
        {state.errors?.firstName &&
          state.errors.firstName.map((error) => (
            <p aria-live="polite" key={error} className="text-xs text-red-500">
              {error}
            </p>
          ))}
        <Input
          label="Last Name"
          placeholder="Enter the last name of the user"
          variant="bordered"
          defaultValue={user.lastName}
          name="lastName"
        />
        {state.errors?.lastName &&
          state.errors.lastName.map((error) => (
            <p aria-live="polite" key={error} className="text-xs text-red-500">
              {error}
            </p>
          ))}

        <Input
          label="Phone Number"
          placeholder="Enter the phone number of the user"
          variant="bordered"
          defaultValue={user.phoneNumber}
          name="phoneNumber"
        />
        {state.errors?.phoneNumber &&
          state.errors.phoneNumber.map((error) => (
            <p aria-live="polite" key={error} className="text-xs text-red-500">
              {error}
            </p>
          ))}

        <Select
          label="Status"
          placeholder="Select the status of the user"
          defaultSelectedKeys={[user.status]}
          name="status"
        >
          {status.map((item) => (
            <SelectItem
              key={item.key}
              startContent={
                <span
                  className={`inline-block w-2 h-2 rounded-full ${item.color}`}
                ></span>
              }
            >
              {item.label}
            </SelectItem>
          ))}
        </Select>

        {state.errors?.status &&
          state.errors.status.map((error) => (
            <p aria-live="polite" key={error} className="text-xs text-red-500">
              {error}
            </p>
          ))}

        <Input
          label="Company"
          placeholder="Enter the company name"
          variant="bordered"
          defaultValue={user.company}
          name="company"
        />
        {state.errors?.company &&
          state.errors.company.map((error) => (
            <p aria-live="polite" key={error} className="text-xs text-red-500">
              {error}
            </p>
          ))}
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
          {state.errors?.roles &&
            state.errors.roles.map((error) => (
              <p
                aria-live="polite"
                key={error}
                className="text-xs text-red-500"
              >
                {error}
              </p>
            ))}
        </ul>
      </ModalBody>
      <ModalFooter>
        {state.success === false && <FormError errorMessage={state.message} />}
        <Button type="reset" color="danger" variant="flat">
          Reset
        </Button>
        <Button type="submit" color="primary">
          Confirm
        </Button>
      </ModalFooter>
    </form>
  );
}
