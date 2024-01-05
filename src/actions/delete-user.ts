"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function deleteUser(userId: string) {
  try {
    await sql`DELETE FROM users WHERE id = ${userId}`;
    revalidatePath("/admin");
  } catch (error) {
    console.error(error);
  }
}
