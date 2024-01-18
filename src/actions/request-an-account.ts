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
  b2bPortal: z.boolean().nullish(),
  photoDatabase: z.boolean().nullish(),
  commentaryLiveSystem: z.boolean().nullish(),
  costumerServiceTool: z.boolean().nullish(),
  matchAnalysisHub: z.boolean().nullish(),
  mediaPortal: z.boolean().nullish(),
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
    b2bPortal?: string[];
    photoDatabase?: string[];
    commentaryLiveSystem?: string[];
    costumerServiceTool?: string[];
    matchAnalysisHub?: string[];
    mediaPortal?: string[];
  };
  message: string;
};

export async function requestAnAccount(prevState: State, formData: FormData) {
  noStore();

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
    b2bPortal: formData.get("b2bPortal"),
    photoDatabase: formData.get("photoDatabase"),
    commentaryLiveSystem: formData.get("commentaryLiveSystem"),
    costumerServiceTool: formData.get("costumerServiceTool"),
    matchAnalysisHub: formData.get("matchAnalysisHub"),
    mediaPortal: formData.get("mediaPortal"),
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
    phoneNumber,
    b2bPortal,
    photoDatabase,
    commentaryLiveSystem,
    costumerServiceTool,
    matchAnalysisHub,
    mediaPortal,
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
        phoneNumber,
        b2bPortal,
        photoDatabase,
        commentaryLiveSystem,
        costumerServiceTool,
        matchAnalysisHub,
        mediaPortal,
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
