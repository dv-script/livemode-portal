import { scoutsByMatchURL } from "@/constants/constants-url";
import { unstable_noStore } from "next/cache";

export async function getScoutsByMatch(matchId: number) {
  unstable_noStore();
  try {
    const response = await fetch(scoutsByMatchURL.replace(":id", String(matchId)), {
      headers: { Authorization: `Bearer ${process.env.FOOTSTATS_TOKEN}` },
    });
    return await response.json();
  } catch (error) {
    console.log(`Error trying to get the id from: ${matchId}`, error);
  }
}
