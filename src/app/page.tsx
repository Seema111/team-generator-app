import Navbar from "@/ components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#e0e0e0]">
      <Navbar />
      <h1 className="text-3xl font-bold text-gray-700 text-center p-8">
        Welcome to My Next.js Page!
      </h1>
      <p className="text-lg text-center text-gray-700">
        This page is a homepage
      </p>
    </div>
  );
}
