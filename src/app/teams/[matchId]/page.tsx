"use client"; // Mark this as a client-side component

import { IPlayer } from "@/types";
import React, { useState, useEffect } from "react";
import MatchLinkCopy from "../MatchLink";

export interface Player {
  id: string;
  name: string;
}

export interface Team {
  id: string;
  name: string;
  players: IPlayer[];
}

export interface Match {
  matchId: string;
  id: string;
  title: string;
  teamCount: number;
  playerCount: number;
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
    return (
      <div className="text-center py-8 text-xl text-gray-700">Loading...</div>
    );
  }

  if (!matchResponse || error) {
    return (
      <div className="text-center py-8 text-xl text-gray-700">
        Match not found or an error occurred.
      </div>
    );
  }

  const { match, teams } = matchResponse;
  if (!match || !teams) {
    return (
      <div className="text-center py-8 text-xl text-gray-700">
        Match or team details not found.
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-6xl shadow-lg inset-shadow-2xs rounded-lg p-4 sm:p-6 grid gap-6">
      <header className="bg-yellow">
        <h2 className="text-4xl font-bold text-gray-800">{match.title}</h2>
        <p className="text-gray-600 mt-2 text-lg">
          {match.playerCount} participants in {match.teamCount} teams
        </p>
      </header>
      <MatchLinkCopy matchId={matchId} />
      <div className="flex flex-row gap-10">
        {teams.map((team) => {
          const totalSkillValue = team.players.reduce((total, player) => {
            return total + (player.skill || 0);
          }, 0);

          return (
            <div className="w-1/2 pt-2" key={team.teamId}>
              <h3 className="text-xl sm:text-2xl font-bold text-red-900 mb-4">
                {team.name}
              </h3>
              <div className="mt-4">
                <div className="hidden sm:flex justify-between items-center pl-3 pr-2 p-2 bg-blue-500 text-sm font-bold text-white">
                  <span className="flex-1">S.N.</span>
                  <span className="flex-1">Name</span>
                  <span className="flex-1 text-center">Skill</span>
                </div>

                <ul>
                  {team.players.map((player, index) => (
                    <li
                      key={player.id}
                      className="flex flex-col sm:flex-row justify-between items-center pl-4 pr-2 p-2  bg-gray-50 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 last:border-b-0"
                    >
                      <span className="flex-1 min-w-0 truncate text-center sm:text-left text-gray-700 font-semibold">
                        {index + 1})
                      </span>
                      <span className="flex-1 min-w-0 truncate text-center sm:text-left text-gray-700 font-semibold">
                        {player.name}
                      </span>
                      <span className="flex-1 min-w-0 truncate text-center sm:text-center text-blue-800 font-semibold">
                        {player.skill}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row justify-between items-center pl-3 pr-2 p-2 bg-blue-100 text-gray-700">
                  <span className="flex-2 min-w-0 truncate text-center sm:text-left font-medium">
                    Total
                  </span>
                  <span className="flex-1 min-w-0 truncate text-center sm:text-center font-semibold text-blue-800">
                    {totalSkillValue}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
