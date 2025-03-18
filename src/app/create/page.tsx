import CreatePlayer from "./CreatePlayer";
import { Player, Team } from "@/types/interface";
import CreateTeam from "./CreateTeam";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getPlayers(): Promise<Player[]> {
  try {
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

async function getTeams(): Promise<Team[]> {
  try {
    if (!apiBaseUrl) {
      throw new Error("API base URL is not defined in environment variables");
    }

    const res = await fetch(`${apiBaseUrl}/api/teams`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API Response Not OK:", res.status, res.statusText);
      throw new Error("Failed to fetch teams");
    }

    const result = await res.json();
    return result?.data;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
}

export default async function CreatePage() {
  const initialPlayers = await getPlayers();
  const initialTeams = await getTeams();

  return (
    <>
      <CreatePlayer initialPlayers={initialPlayers} />;
      <CreateTeam initialTeams={initialTeams} />
    </>
  );
}
