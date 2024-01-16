"use server";
import { prisma } from "@/lib/prisma";

export async function getAllUsers() {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        company: true,
        phoneNumber: true,
        status: true,
        roles: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users;
  } catch (error) {
    return console.log(error);
  }
}
