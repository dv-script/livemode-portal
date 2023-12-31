"use server"
import { signIn } from "@/app/auth/providers";
import { redirect } from "next/navigation";

export async function authenticateUser(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
    redirect('/');
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialsSignIn";
    }

    throw error;
  }
}