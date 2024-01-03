'use client';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input } from "@nextui-org/react";
import { PiPencilLine } from "react-icons/pi";
import { useFormState } from "react-dom";
import { editUser } from "@/actions/edit-user";

interface IUser {
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

const allRoles = [
  { name: 'B2B Portal', key: 'b2b_portal' },
  { name: 'Photo Database', key: 'photo_database' },
  { name: 'Commentary Live System', key: 'commentary_live_system' },
  { name: 'Costumer Service Tool', key: 'costumer_service_tool' },
  { name: 'Match Analysis Hub', key: 'match_analysis_hub' },
  { name: 'Media Portal', key: 'media_portal' },
  { name: 'Administrator', key: 'admin' }
]

export function EditUserModal({ user }: IUser) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const initialState = { message: null, errors: {} }
  //@ts-ignore
  const [state, dispatch] = useFormState(editUser, initialState);

  return (
    <>
      <button onClick={onOpen} className="text-lg text-default-500 cursor-pointer active:opacity-50">
        <PiPencilLine />
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
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
                  name="first_name"
                />
                <Input
                  label="Last Name"
                  placeholder="Enter the last name of the user"
                  variant="bordered"
                  defaultValue={user.last_name}
                  name="last_name"
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
                        name={role.key}
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
                <Button color="primary" onPress={onClose}>
                  Confirm
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
