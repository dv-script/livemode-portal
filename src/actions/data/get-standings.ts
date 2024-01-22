"use server";
import { standingsURL } from "@/utils/constants/constants-url";
import { unstable_noStore } from "next/cache";

export async function getStandings() {
  unstable_noStore();
  try {
    const response = await fetch(standingsURL, {
      headers: { Authorization: `Bearer ${process.env.FOOTSTATS_TOKEN}` },
    });
    return await response.json();
  } catch (error) {
    console.log("Error to get the standings", error);
  }
}
