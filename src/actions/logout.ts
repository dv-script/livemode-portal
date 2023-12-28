"use server"
import { signOut } from "@/app/auth/providers";

export async function logout() {
    try {
        await signOut() 
    } catch (error) {
        console.log(error);
    }
}