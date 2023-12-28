"use server"
import { signIn } from "@/app/auth/providers";

export async function authenticateUser(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', Object.fromEntries(formData));
    } catch (error) {
      if ((error as Error).message.includes("CredentialsSignin")) {
        return "CredentialsSignin";
      }

      throw error;
    }
  }