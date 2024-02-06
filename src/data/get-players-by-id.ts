import { playersURL } from "@/constants/constants-url";
import { unstable_noStore } from "next/cache";

export async function getPlayersById(id: number) {
  unstable_noStore();
  try {
    const response = await fetch(playersURL.replace(":id", String(id)), {
      headers: { Authorization: `Bearer ${process.env.FOOTSTATS_TOKEN}` },
    });
    return await response.json();
  } catch (error) {
    console.log(`Error trying to get the id from: ${id}`, error);
  }
}
