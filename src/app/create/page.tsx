import CreatePlayer from '@/app/create/components/CreatePlayer';
import CreateTeam from '@/app/create/components/CreateTeam';


async function fetchData() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error('API base URL is not defined');
  }

  try {
    const [playersRes, teamsRes] = await Promise.all([
      fetch(`${apiBaseUrl}/api/players`),
      fetch(`${apiBaseUrl}/api/teams`),
    ]);

    if (!playersRes.ok || !teamsRes.ok) {
      throw new Error('Failed to fetch data');
    }

    const [playersData, teamsData] = await Promise.all([
      playersRes.json(),
      teamsRes.json(),
    ]);

    return {
      players: playersData.data || [],
      teams: teamsData.data || [],
    };
  } catch (error) {
    console.error('Error fetching teams or players:', error);
    return { players: [], teams: [], error: 'Failed to fetch data, try again later' };
  }
}

const CreatePage = async () => {
  const { players, teams, error } = await fetchData();
  
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <CreatePlayer initialPlayers={players} />
      <CreateTeam initialTeams={teams} />
    </>
  );
};

export default CreatePage;
