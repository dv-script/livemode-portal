'use server';
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const EditUserFormSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    company: z.string().refine(value => !!value, { message: 'Company is required' }),
    firstName: z.string().min(2, { message: 'First name has to be at least 2 characters long' }),
    lastName: z.string().min(2, { message: 'Last name has to be at least 2 characters long' }),
    roles: z.array(z.string()).min(1, "At least one role must be selected."),
    updatedAt: z.string()
})

export type State = {
    errors?: {
        email?: string[]
        company?: string[]
        firstName?: string[]
        lastName?: string[]
        roles?: string[] 
    }
    message: string
    success?: boolean
};

export async function editUser(prevState: State, formData: FormData) {
    const allRoles = formData.getAll("roles");
    const checkedRoles = allRoles.filter((role) => role !== "off");

    const validatedFields = EditUserFormSchema.safeParse({
        email: formData.get("email"),
        company: formData.get("company"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        roles: checkedRoles,
        updatedAt: new Date().toISOString(),
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
        roles,
        updatedAt
    } = validatedFields.data;

    try {
        await sql`
            UPDATE
                users
            SET 
                email = ${email}, 
                company = ${company}, 
                first_name = ${firstName},
                last_name = ${lastName},
                roles = ${roles as any},
                updated_at = ${updatedAt}
            WHERE
                email = ${email}
        `
        revalidatePath('/admin');
        return { message: 'User successfully updated', success: true }
    } catch (error) {
        if (error instanceof Error) {
            return { message: 'Failed to update user', success: false };
        }
        throw error;
    }
}