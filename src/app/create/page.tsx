import CreatePlayer from "@/app/create/components/CreatePlayer";
import CreateTeam from "@/app/create/components/CreateTeam";
import { IPlayer, ITeam } from "@/types";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getPlayers(): Promise<IPlayer[]> {
  try {
    if (!apiBaseUrl) {
      throw new Error("API base URL is not defined in environment variables");
    }

    const res = await fetch(`${apiBaseUrl}/api/players`);

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

async function getTeams(): Promise<ITeam[]> {
  try {
    if (!apiBaseUrl) {
      throw new Error("API base URL is not defined in environment variables");
    }

    const res = await fetch(`${apiBaseUrl}/api/teams`);

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
