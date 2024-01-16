"use server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { auth } from "@/app/auth/providers";

const changeYourPasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(8, { message: "Password has to be at least 8 characters long" }),
  password: z
    .string()
    .min(8, { message: "Password has to be at least 8 characters long" }),
  passwordConfirmation: z
    .string()
    .min(8, { message: "Password has to be at least 8 characters long" }),
});

export type State = {
  errors?: {
    currentPassword?: string[];
    password?: string[];
    passwordConfirmation?: string[];
  };
  message?: string;
  sucess?: boolean;
};

export async function changeYourPassword(prevState: State, formData: FormData) {
  const session = await auth();

  const validatedFields = changeYourPasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    password: formData.get("password"),
    passwordConfirmation: formData.get("passwordConfirmation"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please, fill in the fields correctly.",
    };
  }

  const { currentPassword, password, passwordConfirmation } =
    validatedFields.data;

  if (password !== passwordConfirmation) {
    return {
      errors: {
        passwordConfirmation: ["Passwords do not match"],
      },
      message: "Please, fill in the fields correctly.",
    };
  }

  const user = await sql`
    SELECT * FROM users WHERE email = ${session?.user.email}
  `;

  const passwordMatch = await bcrypt.compare(
    currentPassword,
    user.rows[0].password
  );

  if (!passwordMatch) {
    return {
      errors: {
        currentPassword: ["Current password is incorrect"],
      },
      message: "Please, fill in the fields correctly.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
      UPDATE users
      SET password = ${hashedPassword}
      WHERE email = ${session?.user.email}
    `;
    return {
      message: "Password has been changed successfully.",
      success: true,
    };
  } catch (error) {
    return {
      message: "Something went wrong. Please, try again later.",
      success: false,
    };
  }
}
