import CreateClient from "./CreateClient";
import { Player } from "@/types/player";

async function getPlayers(): Promise<Player[]> {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      throw new Error("API base URL is not defined in environment variables");
    }

    const res = await fetch(`${apiBaseUrl}/api/players`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API Response Not OK:", res.status, res.statusText);
      throw new Error("Failed to fetch players");
    }

    const result = await res.json();
    return result?.data;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
}

export default async function CreatePage() {
  const initialPlayers = await getPlayers();

  return <CreateClient initialPlayers={initialPlayers} />;
}