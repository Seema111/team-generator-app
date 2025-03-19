"use client";

import React, { useState } from "react";

export default function CreateMatch() {
  const [title, setTitle] = useState("");
  return (
    <div className="flex-grow-0 w-1/4">
      <div className="left-0 flex justify-center pl-4 pr-4 pb-4">
        <div className="rounded-lg flex flex-col lg:flex-row gap-6">
          <div className="w-full">
            <form onSubmit={() => {}} className="space-y-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Title
              </h1>

              {/* {error ? (
                <div className="p-2 bg-red-100 text-red-600 rounded-md">
                  {error}
                </div>
              ) : ( */}
              <div className="p-2 bg-green-100 text-green-600 rounded-md">
                Title for the Event
              </div>
              {/* )} */}

              <div>
                <label
                  htmlFor="team"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <div className="flex items-center border rounded-md p-2 focus-within:border-indigo-600">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    className="w-full p-2 text-gray-900 placeholder-gray-400 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="p-2 flex text-gray-500 cursor-pointer hover:text-indigo-600"
                >
                  Generate Teams
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        title="Confirm Delete"
        message="Are you sure you want to delete this team?"
        confirmText="Delete"
        cancelText="Cancel"
      /> */}
    </div>
  );
}
