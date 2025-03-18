"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
        Team Building, Simplified
      </h1>
      <div className="w-full mt-6 max-w-[500px] mx-auto flex justify-center">
        <Image
          src="/images/find-team.png"
          alt="Team Collaboration"
          width={500}
          height={400}
          className="rounded-lg shadow-lg w-full h-auto"
        />
      </div>
      <p className="mt-6 text-base font-medium text-gray-500 sm:text-lg md:text-xl lg:mt-8 lg:text-2xl">
        Quickly create skill-balanced teams for any activity.
      </p>
      <p className="mt-2 text-base font-medium text-gray-500 sm:text-lg md:text-xl lg:text-2xl">
        Our smart tool ensures fairness, so every team has the right mix of
        talent.
      </p>
      <div className="mt-8 flex items-center justify-center gap-x-6 sm:mt-10">
        <a
          href="/create"
          className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:px-6 sm:py-3 sm:text-base"
        >
          Create Your Team
        </a>
      </div>
    </div>
  );
}
