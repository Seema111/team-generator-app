"use client";

import { FaPlus, FaEdit } from "react-icons/fa";
import { Key, useEffect, useReducer } from "react";
import { ITeam } from "@/types";
import ConfirmationModal from "@/components/ConfirmationModal";
import React from "react";
import { initialTeamState, teamReducer } from "@/app/utils/reducer";

export default function CreateTeam() {
  const [state, dispatch] = useReducer(teamReducer, initialTeamState);
  const {
    teams,
    teamName,
    editIndex,
    isSubmitting,
    error,
    isDeleteModalOpen,
    teamIdToDelete,
  } = state;

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsRes = await fetch(`${apiBaseUrl}/api/teams`);

        if (!teamsRes.ok) {
          throw new Error("Failed to fetch players");
        }

        const teamsData = await teamsRes.json();
        dispatch({ type: "SET_TEAMS", payload: teamsData.data || [] });
      } catch (error) {
        console.error("Error fetching teams:", error);
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to fetch teams, try again later.",
        });
      }
    };

    fetchTeams();
  }, [apiBaseUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamName.trim()) {
      dispatch({ type: "SET_ERROR", payload: "Please enter a Team Name." });
      return;
    }

    dispatch({ type: "SET_IS_SUBMITTING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

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
        dispatch({ type: "SET_TEAMS", payload: updatedTeams });
        dispatch({ type: "SET_EDIT_INDEX", payload: null });
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
        dispatch({ type: "SET_TEAMS", payload: [...teams, newTeam.data] });
      }

      dispatch({ type: "SET_TEAM_NAME", payload: "" });
    } catch (error) {
      console.error("Error:", error);
      dispatch({
        type: "SET_ERROR",
        payload: "An error occurred. Please try again.",
      });
    } finally {
      dispatch({ type: "SET_IS_SUBMITTING", payload: false });
    }
  };

  const handleEdit = (index: number) => {
    const team = teams[index];
    dispatch({ type: "SET_TEAM_NAME", payload: team.name });
    dispatch({ type: "SET_EDIT_INDEX", payload: index });
  };

  const handleDeleteClick = (teamId: string) => {
    dispatch({ type: "SET_TEAM_ID_TO_DELETE", payload: teamId });
    dispatch({ type: "SET_IS_DELETE_MODAL_OPEN", payload: true });
  };

  const handleDeleteConfirm = async () => {
    if (!teamIdToDelete) return;

    try {
      const response = await fetch(
        `${apiBaseUrl}/api/teams?id=${teamIdToDelete}`,
        {
          method: "DELETE",
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to delete team");
      }

      dispatch({
        type: "SET_TEAMS",
        payload: teams.filter((team) => team.teamId !== teamIdToDelete),
      });
      handleDeleteCancel();
    } catch (error) {
      console.error("Error:", error);
      dispatch({
        type: "SET_ERROR",
        payload: "An error occurred. Please try again.",
      });
    }
  };

  const handleDeleteCancel = () => {
    dispatch({ type: "SET_IS_DELETE_MODAL_OPEN", payload: false });
    dispatch({ type: "SET_TEAM_ID_TO_DELETE", payload: null });
  };

  return (
    <div className="flex-grow">
      <div className="w-full left-0 flex justify-center pl-4 pb-4">
        <div className="w-full rounded-lg grid lg:flex-row gap-6">
          <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                {editIndex !== null ? "Edit Team" : "Create Team"}
              </h1>

              {error ? (
                <div className="p-2 bg-red-100 text-red-600 rounded-md">
                  {error}
                </div>
              ) : (
                <div className="p-2 bg-green-100 text-green-600 rounded-md">
                  Add your Team name
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
                  <input
                    id="team"
                    name="team"
                    type="text"
                    placeholder="Enter team name"
                    value={teamName}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_TEAM_NAME",
                        payload: e.target.value,
                      })
                    }
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
            </form>
          </div>

          <div className="w-full pt-21">
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
                  teams.map((team: ITeam, index: Key) => (
                    <TeamListItem
                      key={team.id}
                      team={team}
                      index={index as number}
                      onEdit={handleEdit}
                      onDelete={handleDeleteClick}
                    />
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

const TeamListItem = ({
  key,
  team,
  index,
  onEdit,
  onDelete,
}: {
  key: string;
  team: ITeam;
  index: number;
  onEdit: (index: number) => void;
  onDelete: (teamId: string) => void;
}) => {
  return (
    <li
      key={key}
      className="flex flex-col sm:flex-row justify-between items-center pl-3 pr-2 p-1 bg-white text-gray-700 border border-gray-200 border-t-0"
    >
      <span className="flex-1 min-w-0 truncate text-center sm:text-left">
        {team.name}
      </span>
      <div className="flex-1 text-right mt-2 sm:mt-0 flex gap-2 justify-end">
        <button
          onClick={() => onEdit(index)}
          className="p-1 text-gray-500 cursor-pointer hover:text-blue-600 focus:outline-none flex-shrink-0"
        >
          <FaEdit className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(team.teamId)}
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
  );
};
