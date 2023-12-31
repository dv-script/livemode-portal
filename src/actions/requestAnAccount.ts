"use server";
import { z } from "zod";
import { unstable_noStore } from "next/cache";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

const RequestAnAccountFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  company: z.string(),
  firstName: z.string().min(2, { message: 'First name has to be at least 2 characters long' }),
  lastName: z.string().min(2, { message: 'Last name has to be at least 2 characters long' }),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
  b2bPortal: z.string().nullish(),
  photoDatabase: z.string().nullish(),
  commentaryLiveSystem: z.string().nullish(),
  customerServiceTool: z.string().nullish(),
  matchAnalysisHub: z.string().nullish(),
  mediaPortal: z.string().nullish(),
})

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
    customerServiceTool?: string[];
    matchAnalysisHub?: string[];
    mediaPortal?: string[];
  };

};

export async function requestAnAccount(_prevState: State, formData: FormData) {
  unstable_noStore();

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
    customerServiceTool: formData.get("customerServiceTool"),
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
    customerServiceTool,
    matchAnalysisHub,
    mediaPortal,
  } = validatedFields.data;

  try {
    await sql`INSERT INTO request_an_account ("email", "company", "first-name", "last-name", "country", "state", "city", "address", "phone-number", "b2b-portal", "photo-database", "commentary-live-system", "customer-service-tool", "match-analysis-hub", "media-portal") VALUES (${email}, ${company}, ${firstName}, ${lastName}, ${country}, ${state}, ${city}, ${address}, ${phoneNumber}, ${b2bPortal}, ${photoDatabase}, ${commentaryLiveSystem}, ${customerServiceTool}, ${matchAnalysisHub}, ${mediaPortal})`;
  } catch (err) {
    console.log(err);
  }

  redirect("/auth/sign-in");
}