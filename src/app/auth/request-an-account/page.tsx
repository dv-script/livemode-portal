import { RequestAnAccountForm } from "@/app/auth/request-an-account/_components/request-an-account-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FPF - Request an Account",
  description:
    "Become a part of the FPF digital community. Submit your request for an account and gain the ability to manage and update important football content and news.",
};

export default function RequestAnAccount() {
  return (
    <div className="flex justify-center items-center py-16 background">
      <RequestAnAccountForm />
    </div>
  );
}
