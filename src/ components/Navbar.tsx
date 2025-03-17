"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-[2%] left-1/2 transform -translate-x-1/2 w-[70%] bg-[#f0f0f0] shadow-lg z-50 rounded-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-[#0070f3]">
          <Link href="/" onClick={closeMenu}>
            TeamGenerator
          </Link>
        </div>
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
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition duration-300"
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 transition duration-300"
              onClick={closeMenu}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition duration-300"
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 transition duration-300"
                onClick={closeMenu}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
