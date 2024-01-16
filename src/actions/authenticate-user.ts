"use server";
import { signIn } from "@/app/auth/providers";
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
  sucess?: boolean;
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

  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return { message: "Email or password are wrong.", success: false };
    }
  }
  redirect("/");
}
