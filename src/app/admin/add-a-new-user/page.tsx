import { AddANewUserForm } from "@/app/admin/add-a-new-user/_components/add-a-new-user-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FPF - New User Registration",
  description:
    "Register a new user account with our step-by-step guide. Provide essential details, assign roles, and establish account preferences to ensure a smooth onboarding process.",
};

export default function AddANewUser() {
  return (
    <div className="flex justify-center items-center py-16 min-h-screen background">
      <AddANewUserForm />
    </div>
  );
}
