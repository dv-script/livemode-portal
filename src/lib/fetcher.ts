import { unstable_noStore } from "next/cache";
import { matchesURL, standingsURL, teamURL } from "./constants";

export async function fetchMatches() {
  unstable_noStore();
  try {
    const response = await fetch(matchesURL, {
      headers: { Authorization: `Bearer ${process.env.FOOTSTATS_TOKEN}` },
    });

    return await response.json();
  } catch (error) {
    console.log("Error to get all matches", error);
  }
}

export async function fetchTeamById(id: number) {
  unstable_noStore();
  try {
    const response = await fetch(teamURL.replace(":id", String(id)), {
      headers: { Authorization: `Bearer ${process.env.FOOTSTATS_TOKEN}` },
    });

    return await response.json();
  } catch (error) {
    console.log(`Error trying to get the id from: ${id}`, error);
  }
}

export async function fetchStandings() {
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
