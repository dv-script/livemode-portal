"use server"
import { sql } from "@vercel/postgres";

interface IUser {
  id: string
  email: string
  first_name: string
  last_name: string
  password: string
  company: string
  roles: string[]
  created_at: Date
  updated_at: Date
}

export async function getAllUsers() {
  try {
    const { rows } = await sql<IUser>`
            SELECT * FROM users
        `;
    return rows;
  } catch (error) {
    return console.log(error);
  }
}
