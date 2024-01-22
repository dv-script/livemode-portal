"use client";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { PiPencilLine } from "react-icons/pi";
import { EditUserForm } from "./edit-user-form";

interface IUser {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    company: string;
    phoneNumber: string;
    status: string;
    roles: string[];
    createdAt: Date;
    updatedAt: Date;
    updatedBy: string;
  };
}

export function EditUserModal({ user }: IUser) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        onClick={onOpen}
        className="text-lg text-default-500 cursor-pointer active:opacity-50"
      >
        <PiPencilLine />
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
        size="lg"
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => <EditUserForm user={user} onClose={onClose} />}
        </ModalContent>
      </Modal>
    </>
  );
}
