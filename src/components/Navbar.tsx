"use client";
import Link from "next/link";
import { useState } from "react";
import { FaUsers, FaHome } from "react-icons/fa";
import { GrTools } from "react-icons/gr";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="hidden md:block">
      <nav className="absolute top-[2%] left-1/2 transform -translate-x-1/2 w-[70%] bg-white shadow-lg inset-shadow-2xs rounded-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-[#6366f1] flex items-center space-x-2">
            <FaUsers className="text-2xl" />
            {/* Hide "TeamGenerator" text on small screens */}
            <Link href="/" onClick={closeMenu} className="hidden sm:block">
              TeamGenerator
            </Link>
          </div>

          <ul className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
            <li>
              <Link
                href="/"
                className="text-gray-700 hover:text-[#6366f1] transition duration-300 flex items-center space-x-2"
                onClick={closeMenu}
              >
                <FaHome className="text-md" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/create"
                className="text-gray-700 hover:text-[#6366f1] transition duration-300 flex items-center space-x-2"
                onClick={closeMenu}
              >
                <GrTools className="text-md" />
                <span>Generate Your Team</span>
              </Link>
            </li>
          </ul>

          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <ul className="flex flex-col space-y-2 p-4">
              <li>
                <Link
                  href="/"
                  className="text-gray-700 hover:text-[#6366f1] transition duration-300 flex items-center space-x-2"
                  onClick={closeMenu}
                >
                  <FaHome className="text-xl" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/create"
                  className="text-gray-700 hover:text-[#6366f1] transition duration-300 flex items-center space-x-2"
                  onClick={closeMenu}
                >
                  <GrTools className="text-xl" />
                  <span>Generate Your Team</span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}