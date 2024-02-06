import { topScorersURL } from "@/constants/constants-url";
import { unstable_noStore } from "next/cache";

export async function getTopScorers() {
  unstable_noStore();
  try {
    const response = await fetch(topScorersURL, {
      headers: { Authorization: `Bearer ${process.env.FOOTSTATS_TOKEN}` },
    });
    return await response.json();
  } catch (error) {
    console.log("Error to get the top scorers", error);
  }
}
