"use client"; // Mark this as a client-side component

import { IPlayer } from "@/types";
import React, { useState, useEffect } from "react";

export interface Player {
  id: string;
  name: string;
}

export interface Team {
  teamId: string;
  id: string;
  name: string;
  players: IPlayer[];
}

export interface Match {
  matchId: string;
  id: string;
  title: string;
  teamCount: number;
}

export interface MatchResponse {
  match: Match | null;
  teams: Team[] | null;
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchMatchDetails = async (
  matchId: string
): Promise<MatchResponse | null> => {
  try {
    const response = await fetch(
      `${apiBaseUrl}/api/generate?matchId=${matchId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch match details");
    }
    const responseData = await response.json();
    return responseData?.data;
  } catch (error) {
    console.error("Error fetching match details:", error);
    return null;
  }
};

export default function TeamsPage({
  params,
}: {
  params: Promise<{ matchId: string }>;
}) {
  const [matchResponse, setMatchResponse] = useState<MatchResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Unwrap params using React.use()
  const { matchId } = React.use(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMatchDetails(matchId);
        setMatchResponse(data);
      } catch (err) {
        console.log(err);
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [matchId]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!matchResponse || error) {
    return (
      <div className="text-center py-8">
        Match not found or an error occurred.
      </div>
    );
  }

  const { match, teams } = matchResponse;
  console.log(matchResponse);
  if (!match || !teams) {
    return (
      <div className="text-center py-8">Match or team details not found.</div>
    );
  }

  return (
    <div className="bg-gray-100 p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{match.title}</h1>
        <p className="text-gray-600 mt-2">10 participants in 2 teams</p>
      </header>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            value={`${window.location.origin}/matches/${matchId}`}
            disabled
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
              />
            </svg>
          </span>
        </div>
        <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {teams.map((team) => (
          <div key={team.teamId} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {team.name} ({team.players.length})
            </h2>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">S.N</th>
                  <th className="py-2 text-left">Name</th>
                </tr>
              </thead>
              <tbody>
                {team.players.map((player, index) => (
                  <tr key={player.id} className="border-b">
                    <td className="py-2">{index + 1}.</td>
                    <td className="py-2">{player.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
