import { list } from "@vercel/blob";

export async function getBlobPlayers() {
  try {
    const { blobs } = await list();
    return blobs;
  } catch (error) {
    console.error(error);
  }
}
