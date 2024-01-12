import { matchesURL, teamURL } from "./constants";

export async function fetchMatches() {
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
  try {
    const response = await fetch(teamURL.replace(":id", String(id)), {
      headers: { Authorization: `Bearer ${process.env.FOOTSTATS_TOKEN}` },
    });

    return await response.json();
  } catch (error) {
    console.log(`Error trying to get the id from: ${id}`, error);
  }
}
