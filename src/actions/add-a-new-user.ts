"use server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import bcrypt from 'bcrypt';
import { sendEmail } from "./send-email";
import { EmailTemplate } from "@/components/email-template";

const addANewUserSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    company: z.string(),
    firstName: z.string().min(2, { message: 'First name has to be at least 2 characters long' }),
    lastName: z.string().min(2, { message: 'Last name has to be at least 2 characters long' }),
    password: z.string().min(8, { message: 'Password has to be at least 8 characters long' }),
    roles: z.array(z.string()),
    createdAt: z.date(),
})

export type State = {
    errors?: {
        email?: string[];
        company?: string[];
        firstName?: string[];
        lastName?: string[];
        password?: string[];
        roles?: string[];
    };
};

export async function addANewUser(_prevState: State, formData: FormData) {
    const allRoles = formData.getAll("roles");
    const checkedRoles = allRoles.filter((role) => role !== "off");

    const validatedFields = addANewUserSchema.safeParse({
        email: formData.get("email"),
        company: formData.get("company"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        password: formData.get("password"),
        roles: checkedRoles,
        createdAt: new Date,
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
        createdAt
    } = validatedFields.data;

    const hashPassword = await bcrypt.hash(password, 10);

    try {
        await sql`INSERT INTO users (
        first_name,
        last_name,
        email,
        company,
        password,
        roles,
        created_at
    ) VALUES (
        ${firstName},
        ${lastName},
        ${email},
        ${company},
        ${hashPassword},
        ${roles as any},
        ${createdAt.toISOString()}
    )`

        await sendEmail({
            to: Array(email),
            subject: "Dive Into Your Livemode Experience – Account Activated.",
            react: EmailTemplate({ firstName: firstName, lastName: lastName, email: email, password: password }) as React.ReactElement,
        });

    } catch (err) {
        console.log(err);
    }

    redirect("/admin");
}