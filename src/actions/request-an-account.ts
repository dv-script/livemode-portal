"use server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

const RequestAnAccountFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  company: z
    .string()
    .refine((value) => !!value, { message: "Company is required" }),
  firstName: z
    .string()
    .min(2, { message: "First name has to be at least 2 characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Last name has to be at least 2 characters long" }),
  country: z
    .string()
    .refine((value) => !!value, { message: "Country is required" }),
  state: z
    .string()
    .refine((value) => !!value, { message: "State is required" }),
  city: z.string().refine((value) => !!value, { message: "City is required" }),
  address: z
    .string()
    .refine((value) => !!value, { message: "Address is required" }),
  phoneNumber: z
    .string()
    .refine((value) => !!value, { message: "Phone number is required" }),
  roles: z.array(z.string()),
});

export type State = {
  errors?: {
    email?: string[];
    company?: string[];
    firstName?: string[];
    lastName?: string[];
    country?: string[];
    state?: string[];
    city?: string[];
    address?: string[];
    phoneNumber?: string[];
    roles?: string[];
  };
  message: string;
};

export async function requestAnAccount(prevState: State, formData: FormData) {
  noStore();
  const allRoles = formData.getAll("roles");
  const checkedRoles = allRoles.filter((role) => role !== "off");

  const validatedFields = RequestAnAccountFormSchema.safeParse({
    email: formData.get("email"),
    company: formData.get("company"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    country: formData.get("country"),
    state: formData.get("state"),
    city: formData.get("city"),
    address: formData.get("address"),
    phoneNumber: formData.get("phoneNumber"),
    roles: checkedRoles,
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
    country,
    state,
    city,
    address,
    roles,
    phoneNumber,
  } = validatedFields.data;

  try {
    await prisma.accountsRequested.create({
      data: {
        email,
        company,
        firstName,
        lastName,
        country,
        state,
        city,
        address,
        roles,
        phoneNumber,
      },
    });

    return {
      message: "Your request has been sent successfully.",
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { message: "Failed to request an account", success: false };
    }
    throw error;
  }
}
