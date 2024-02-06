import { allScoutsURL } from "@/constants/constants-url";
import { unstable_noStore } from "next/cache";

export async function getAllScouts() {
  unstable_noStore();
  try {
    const response = await fetch(allScoutsURL, {
      headers: { Authorization: `Bearer ${process.env.FOOTSTATS_TOKEN}` },
    });
    return await response.json();
  } catch (error) {
    console.log("Error trying to get all scouts from championship", error);
  }
}
