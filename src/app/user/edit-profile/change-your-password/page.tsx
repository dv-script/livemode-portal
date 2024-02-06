import { ChangeYourPasswordForm } from "@/app/user/edit-profile/change-your-password/_components/change-your-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FPF - Change Your Password",
  description:
    "Change your password to ensure the security of your account and protect your personal information.",
};

export default function Page() {
  return (
    <main className="background w-full h-[calc(100vh-9.75rem)] flex justify-center items-center">
      <div className="bg-white max-w-[1300px] flex flex-col gap-8 py-12 px-8 rounded-lg">
        <ChangeYourPasswordForm />
      </div>
    </main>
  );
}
