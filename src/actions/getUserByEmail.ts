"use server"
import { sql } from "@vercel/postgres"

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

export async function getUserByEmail(email: string) {
    try {
      const { rows } = await sql<IUser>`SELECT * FROM users WHERE email = ${email}`
      return rows[0]
    } catch (error) {
        console.error(error)
    }
  }