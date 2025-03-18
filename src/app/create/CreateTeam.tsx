"use client";

import { FaPlus, FaEdit } from "react-icons/fa";
import { Key, useState } from "react";
import { Team } from "@/types/interface";
import ConfirmationModal from "@/components/ConfirmationModal";

interface CreateTeamProps {
  initialTeams: Team[];
}

export default function CreateTeam({ initialTeams }: CreateTeamProps) {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [teamName, setTeamName] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [teamIdToDelete, setTeamIdToDelete] = useState<string | null>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamName.trim()) {
      setError("Please enter a Team Name.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (editIndex !== null) {
        const teamToUpdate = teams[editIndex];
        const response = await fetch(`${apiBaseUrl}/api/teams`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: teamToUpdate.teamId,
            name: teamName,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update team");
        }

        const updatedTeam = await response.json();
        const updatedTeams = [...teams];
        updatedTeams[editIndex] = updatedTeam.data;
        setTeams(updatedTeams);
        setEditIndex(null);
      } else {
        const response = await fetch(`${apiBaseUrl}/api/teams`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: teamName }),
        });

        if (!response.ok) {
          throw new Error("Failed to add team");
        }

        const newTeam = await response.json();
        setTeams([...teams, newTeam.data]);
      }

      setTeamName("");
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (index: number) => {
    const team = teams[index];
    setTeamName(team.name);
    setEditIndex(index);
  };

  const handleDeleteClick = (teamId: string) => {
    setTeamIdToDelete(teamId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!teamIdToDelete) return;

    try {
      const response = await fetch(`${apiBaseUrl}/api/teams`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: teamIdToDelete }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete team");
      }

      const updatedTeams = teams.filter(
        (team) => team.teamId !== teamIdToDelete
      );
      setTeams(updatedTeams);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsDeleteModalOpen(false);
      setTeamIdToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setTeamIdToDelete(null);
  };

  return (
    <div className="fixed top-[45%] left-0 w-full flex justify-center p-4 sm:p-6">
      <div className="w-full max-w-6xl bg-white shadow-lg inset-shadow-2xs rounded-lg p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              {editIndex !== null ? "Edit Team" : "Create Team"}
            </h1>

            {error && (
              <div className="p-2 bg-red-100 text-red-600 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="team"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Team Name
              </label>
              <div className="flex items-center border rounded-md p-2 focus-within:border-indigo-600">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="p-2 text-gray-500 hover:text-indigo-600 focus:outline-none disabled:opacity-50"
                >
                  {editIndex !== null ? (
                    <FaEdit className="w-5 h-5" />
                  ) : (
                    <FaPlus className="w-5 h-5" />
                  )}
                </button>
                <input
                  id="team"
                  name="team"
                  type="text"
                  placeholder="Enter team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full p-2 text-gray-900 placeholder-gray-400 outline-none"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </form>
        </div>

        {/* Right Side: Teams List */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Teams ({teams?.length})
          </h2>
          <div className="mt-4">
            <div className="hidden sm:flex justify-between items-center pl-3 pr-2 p-1 bg-gray-100 text-sm font-medium text-gray-700 border border-gray-200">
              <span className="flex-1">Name</span>
              <span className="flex-1 text-right">Action</span>
            </div>

            <ul>
              {teams.length > 0 ? (
                teams.map((team: Team, index: Key) => (
                  <li
                    key={team.id}
                    className="flex flex-col sm:flex-row justify-between items-center pl-3 pr-2 p-1 bg-white text-gray-700 border border-gray-200 border-t-0"
                  >
                    <span className="flex-1 min-w-0 truncate text-center sm:text-left">
                      {team.name}
                    </span>
                    <div className="flex-1 text-right mt-2 sm:mt-0 flex gap-2 justify-end">
                      <button
                        onClick={() => handleEdit(index as number)}
                        className="p-1 text-gray-500 cursor-pointer hover:text-blue-600 focus:outline-none flex-shrink-0"
                      >
                        <FaEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(team.teamId)}
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
                  No teams added yet.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        title="Confirm Delete"
        message="Are you sure you want to delete this team?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
