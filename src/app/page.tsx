import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-12">
      <h1 className="text-4xl font-bold text-gray-800 text-center mt-16">
        Team Building, Simplified
      </h1>
      <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto mb-8">
        Quickly create random or skill-balanced teams for any activity. Our
        smart tool ensures fairness, so every team has the right mix of talent.
      </p>

      <Link
        href="/create"
        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#6366f1] hover:bg-[#7c3aed] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6366f1] transition duration-300"
      >
        Create Your Teams
      </Link>

      <div className="w-full max-w-[900px]">
        <Image
          src="/images/find-team.png"
          alt="Team Collaboration"
          width={800}
          height={700}
          className="rounded-lg shadow-lg w-full h-auto"
        />
      </div>
    </div>
  );
}
