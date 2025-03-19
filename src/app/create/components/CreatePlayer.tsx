"use client";

import { FaPlus, FaEdit } from "react-icons/fa";
import { Key, useState } from "react";
import { IPlayer } from "@/types";
import ConfirmationModal from "@/components/ConfirmationModal";

interface CreatePlayerProps {
  initialPlayers: IPlayer[];
}

export default function CreatePlayer({ initialPlayers }: CreatePlayerProps) {
  const [players, setPlayers] = useState<IPlayer[]>(initialPlayers);
  const [playerName, setPlayerName] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [playerIdToDelete, setPlayerIdToDelete] = useState<string | null>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!playerName.trim() || selectedSkill === null) {
      setError("Please enter both Player Name and select a Skill.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (editIndex !== null) {
        const playerToUpdate = players[editIndex];
        const response = await fetch(`${apiBaseUrl}/api/players`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: playerToUpdate.playerId,
            name: playerName,
            skill: selectedSkill,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update player");
        }

        const updatedPlayer = await response.json();
        const updatedPlayers = [...players];
        updatedPlayers[editIndex] = updatedPlayer?.data;
        setPlayers(updatedPlayers);
        setEditIndex(null);
      } else {
        const response = await fetch(`${apiBaseUrl}/api/players`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: playerName, skill: selectedSkill }),
        });

        if (!response.ok) {
          throw new Error("Failed to add player");
        }

        const newPlayer = await response.json();
        console.log(newPlayer);
        setPlayers([...players, newPlayer?.data]);
      }
      setPlayerName("");
      setSelectedSkill(null);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (index: number) => {
    const player = players[index];
    setPlayerName(player.name);
    setSelectedSkill(player.skill);
    setEditIndex(index);
  };

  const handleDeleteClick = (playerId: string) => {
    setPlayerIdToDelete(playerId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!playerIdToDelete) return;

    try {
      const response = await fetch(
        `${apiBaseUrl}/api/players?id=${playerIdToDelete}`,
        {
          method: "DELETE",
        }
      );

      const responseData = await response.json();
      console.log("API Response:", responseData);

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to delete player");
      }

      setPlayers((prevPlayers) =>
        prevPlayers.filter((player) => player.playerId !== playerIdToDelete)
      );
      handleDeleteCancel();
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setPlayerIdToDelete(null);
  };

  return (
    <>
      <div className="fixed top-[10%] left-0 w-full flex justify-center p-4 sm:p-6">
        <div className="w-full max-w-6xl bg-white shadow-lg inset-shadow-2xs rounded-lg p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                {editIndex !== null ? "Edit Player" : "Add Player"}
              </h1>

              {error ? (
                <div className="p-2 bg-red-100 text-red-600 rounded-md">
                  {error}
                </div>
              ) : (
                <div className="p-2 bg-green-100 text-green-600 rounded-md">
                  Enter Player name along with their Skill.
                </div>
              )}

              <div>
                <label
                  htmlFor="player"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Player Name
                </label>
                <div className="flex items-center border rounded-md p-2 focus-within:border-indigo-600">
                  <input
                    id="player"
                    name="player"
                    type="text"
                    placeholder="Enter player name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="w-full p-2 text-gray-900 placeholder-gray-400 outline-none"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="p-2 flex text-gray-500 cursor-pointer hover:text-indigo-600 focus:outline-none disabled:opacity-50"
                  >
                    {editIndex !== null ? (
                      <>
                        Edit <FaEdit className="w-5 h-5 pt-1 pl-1" />
                      </>
                    ) : (
                      <>
                        Add <FaPlus className="w-5 h-5 pt-1 pl-1" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rate Skill (Scale of 1-5)
                </label>
                <div className="flex gap-2 flex-wrap">
                  {[1, 2, 3, 4, 5].map((skill) => (
                    <div
                      key={skill}
                      onClick={() => setSelectedSkill(skill)}
                      className={`p-3 border rounded-md cursor-pointer transition-all duration-200 ${
                        selectedSkill !== null && skill <= selectedSkill
                          ? "bg-red-500 text-white border-red-500 shadow-lg"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-500"
                      }`}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Players ({players?.length})
            </h2>
            <div className="mt-4">
              <div className="hidden sm:flex justify-between items-center pl-3 pr-2 p-1 bg-gray-100 text-sm font-medium text-gray-700 border border-gray-200">
                <span className="flex-1">Name</span>
                <span className="flex-1 text-center">Skill (1-5)</span>
                <span className="flex-1 text-right">Action</span>
              </div>

              <ul>
                {players.length > 0 ? (
                  players.map((player: IPlayer, index: Key) => (
                    <li
                      key={player.id}
                      className="flex flex-col sm:flex-row justify-between items-center pl-3 pr-2 p-1 bg-white text-gray-700 border border-gray-200 border-t-0"
                    >
                      <span className="flex-1 min-w-0 truncate text-center sm:text-left">
                        {player.name}
                      </span>

                      <span className="flex-1 text-center min-w-0 mt-2 sm:mt-0">
                        {player.skill}
                      </span>
                      <div className="flex-1 text-right mt-2 sm:mt-0 flex gap-2 justify-end">
                        <button
                          onClick={() => handleEdit(index as number)}
                          className="p-1 text-gray-500 cursor-pointer hover:text-blue-600 focus:outline-none flex-shrink-0"
                        >
                          <FaEdit className="h-5 w-5" />
                        </button>

                        <button
                          onClick={() => handleDeleteClick(player.playerId)}
                          className="p-1 text-gray-500 cursor-pointer hover:text-red-600 focus:outline-none flex-shrink-0"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="p-3 bg-white rounded-md text-gray-500 text-center border border-gray-200">
                    No players added yet.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        title="Confirm Delete"
        message="Are you sure you want to delete this player?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}
