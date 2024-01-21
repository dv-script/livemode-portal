"use server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { sendEmail } from "./send-email";
import { EmailTemplate } from "@/components/email-template";
import { revalidatePath } from "next/cache";

const addANewUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  company: z.string(),
  firstName: z
    .string()
    .min(2, { message: "First name has to be at least 2 characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Last name has to be at least 2 characters long" }),
  password: z
    .string()
    .min(8, { message: "Password has to be at least 8 characters long" }),
  roles: z.array(z.string()),
  phoneNumber: z.string().refine((value) => !!value, {
    message: "Phone number is required",
  }),
  createdAt: z.date(),
});

export type State = {
  errors?: {
    email?: string[];
    company?: string[];
    firstName?: string[];
    lastName?: string[];
    password?: string[];
    roles?: string[];
    phoneNumber?: string[];
  };
  message?: string;
  success?: boolean;
};

export async function addANewUser(prevState: State, formData: FormData) {
  const allRoles = formData.getAll("roles");
  const checkedRoles = allRoles.filter((role) => role !== "off");

  const validatedFields = addANewUserSchema.safeParse({
    email: formData.get("email"),
    company: formData.get("company"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    password: formData.get("password"),
    phoneNumber: formData.get("phoneNumber"),
    roles: checkedRoles,
    createdAt: new Date(),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please, fill in the fields correctly.",
    };
  }

  const {
    email,
    company,
    firstName,
    lastName,
    password,
    roles,
    createdAt,
    phoneNumber,
  } = validatedFields.data;

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.users.create({
      data: {
        email: email,
        company: company,
        firstName: firstName,
        lastName: lastName,
        password: hashPassword,
        phoneNumber: phoneNumber,
        status: "active",
        roles: roles,
        createdAt: createdAt,
      },
    });

    await sendEmail({
      to: Array(email),
      subject: "Dive Into Your Livemode Experience – Account Activated.",
      react: EmailTemplate({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }) as React.ReactElement,
    });

    revalidatePath("/admin/users");
    return {
      message: "User created successfully.",
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      message: "Something went wrong. Please, try again later.",
    };
  }
}
