"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateMatch() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      const matchedResponse = await response.json();

      if (!response.ok) {
        throw new Error(matchedResponse.error || "Failed to generate teams");
      }

      setSuccess("Teams generated successfully!");
      console.log("Generated Data:", matchedResponse.data);

      if (matchedResponse.data?.match?.matchId) {
        router.push(`/teams/${matchedResponse.data.match.matchId}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Name Your Event
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Give the title for your activity and generate teams.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="title" className="sr-only">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter title"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#4169E1] hover:bg-[#3257B8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generating..." : "Generate Teams"}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-2 bg-red-100 text-red-600 rounded-md text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 p-2 bg-green-100 text-green-600 rounded-md text-center">
            {success}
          </div>
        )}
      </div>
    </div>
  );
}
