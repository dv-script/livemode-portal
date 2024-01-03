'use server';
import { sql } from "@vercel/postgres";
import { z } from "zod";

const EditUserFormSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    company: z.string(),
    firstName: z.string().min(2, { message: 'First name has to be at least 2 characters long' }),
    lastName: z.string().min(2, { message: 'Last name has to be at least 2 characters long' }),
    b2bPortal: z.string().nullish(),
    photoDatabase: z.string().nullish(),
    commentaryLiveSystem: z.string().nullish(),
    customerServiceTool: z.string().nullish(),
    matchAnalysisHub: z.string().nullish(),
    mediaPortal: z.string().nullish(),
})

export type State = {
    errors?: {
        email?: string[]
        company?: string[]
        firstName?: string[]
        lastName?: string[]
        b2bPortal?: string[]
        photoDatabase?: string[]
        commentaryLiveSystem?: string[]
        customerServiceTool?: string[]
        matchAnalysisHub?: string[]
        mediaPortal?: string[]
    };
};

export async function editUser(prevState: State, formData: FormData) {
    const validatedFields = EditUserFormSchema.safeParse({
        email: formData.get("email"),
        company: formData.get("company"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        b2bPortal: formData.get("b2bPortal"),
        photoDatabase: formData.get("photoDatabase"),
        commentaryLiveSystem: formData.get("commentaryLiveSystem"),
        customerServiceTool: formData.get("customerServiceTool"),
        matchAnalysisHub: formData.get("matchAnalysisHub"),
        mediaPortal: formData.get("mediaPortal"),
    });

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten() };
    }

    const { email, company, firstName, lastName, b2bPortal, photoDatabase, commentaryLiveSystem, customerServiceTool, matchAnalysisHub, mediaPortal } = validatedFields.data;

    try {
        await sql`UPDATE users SET email = ${email}, company = ${company}, first_name = ${firstName}, last_name = ${lastName}, b2b_portal = ${b2bPortal}, photo_database = ${photoDatabase}, commentary_live_system = ${commentaryLiveSystem}, customer_service_tool = ${customerServiceTool}, match_analysis_hub = ${matchAnalysisHub}, media_portal = ${mediaPortal} WHERE email = ${email}`

        return { message : 'User updated successfully'}
    } catch (error) {
        console.error(error);
    }
}