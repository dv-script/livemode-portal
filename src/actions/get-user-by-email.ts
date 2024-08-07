"use server";
import { prisma } from "@/lib/prisma";

export async function getUserByEmail(email: string) {
  try {
    const user = prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
  }
}
