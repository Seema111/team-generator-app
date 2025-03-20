import React from "react";
import { toast } from "react-toastify";

const MatchLinkCopy = ({ matchId }: { matchId: string }) => {
  const handleCopyLink = () => {
    const matchUrl = `${window.location.origin}/teams/${matchId}`;
    navigator.clipboard
      .writeText(matchUrl)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        toast.error("Failed to copy link. Please try again.");
      });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <div className="relative flex-grow max-w-xl">
        <input
          type="text"
          value={`${window.location.origin}/teams/${matchId}`}
          disabled
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 text-md"
        />
        <span className="absolute inset-y-0 left-0 flex items-center pl-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
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
      <button
        className="p-3 bg-blue-400 text-white cursor-pointer rounded-lg hover:bg-blue-600 transition duration-300"
        title="Copy Link"
        onClick={handleCopyLink} // Add click handler
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
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
  );
};

export default MatchLinkCopy;
