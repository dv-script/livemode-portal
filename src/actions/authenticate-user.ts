"use server";
import { signIn } from "@/app/auth/providers";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";

const authenticateUserSchema = z.object({
  email: z.string().email({ message: "Please, enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type State = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
  success?: boolean;
};

export async function authenticateUser(prevState: State, formData: FormData) {
  const validatedFields = authenticateUserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please, fill in the fields correctly.",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
    return {
      success: true,
      message: "You have been successfully logged in.",
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            message: "E-mail or password is invalid. Please, try again.",
            success: false
          };
        default: 
          return {
            message: "Something went wrong. Please, try again.",
            success: false
          };
      }
    }

    throw error;
  }
}
