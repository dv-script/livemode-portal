import { LoginForm } from "@/app/auth/sign-in/_components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FPF - Account Sign-in",
  description:
    "Sign in to the FPF Services Portal for exclusive access to content management tools.",
};

export default function SignIn() {
  return (
    <div className="flex justify-center items-center min-h-screen background">
      <LoginForm />
    </div>
  );
}
