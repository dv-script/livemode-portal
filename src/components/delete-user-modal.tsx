"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { TbTrash } from "react-icons/tb";
import { deleteUser } from "@/actions/delete-user";
import toast from "react-hot-toast";

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
  };
}

export function DeleteUserModal({ user }: IUser) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        onClick={onOpen}
        className="flex align-center text-lg text-default-danger cursor-pointer active:opacity-50"
      >
        <TbTrash />
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <form action={() => deleteUser(user.id)}>
              <ModalHeader className="flex flex-col gap-1">
                Edit User
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete {user.first_name} {user.last_name}?</p>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="primary" onPress={() => {
                  onClose()
                  toast.success(`${user.first_name} ${user.last_name} was deleted successfully!`)
                }}>
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
