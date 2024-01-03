'use server';
import { sql } from "@vercel/postgres";
import { z } from "zod";

const EditUserFormSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    company: z.string(),
    firstName: z.string().min(2, { message: 'First name has to be at least 2 characters long' }),
    lastName: z.string().min(2, { message: 'Last name has to be at least 2 characters long' }),
    roles: z.array(z.string()),
    updatedAt: z.date()
})

export type State = {
    errors?: {
        email?: string[]
        company?: string[]
        firstName?: string[]
        lastName?: string[]
        roles?: string[] 
    };
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
        updatedAt: new Date,
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
                updated_at = ${updatedAt.toISOString()}
            WHERE
                email = ${email}
        `
        console.log('Done')

        return { message : 'User updated successfully'}
    } catch (error) {
        console.error(error);
    }
}