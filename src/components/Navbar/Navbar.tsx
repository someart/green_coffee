import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Define User interface (simplified)
interface User {
  id: string;
  orders?: string[];
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUser = localStorage.getItem('currentUser');
      setIsLoggedIn(!!currentUser && JSON.parse(currentUser)?.id);
    }
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blur bg-opacity-90 backdrop-blur-lg rounded-full px-4 py-2 shadow-lg flex items-center justify-between gap-4 z-50">
      <div className="flex items-center">
        <Image
          src="/green_coffee/Logo/Logo.png" // Path to your logo image, kept as is
          alt="Company Logo" // Alt text for accessibility
          width={100} // Match your logo's actual width, kept as is
          height={50} // Match your logo's actual height, kept as is
          priority={true} // Optional: prioritizes loading for better LCP
          className="object-contain" // Maintains aspect ratio, kept as is
        />
      </div>
      <div
        className={`${
          isOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row md:space-x-4 items-center absolute md:static top-full left-1/2 transform -translate-x-1/2 md:translate-x-0 mt-2 md:mt-0 bg-white md:bg-transparent rounded-lg md:rounded-none p-4 md:p-0 shadow-md md:shadow-none transition-all duration-300 ease-in-out`}
      >
        <Link
          href="/"
          className="nav-item px-3 py-2 rounded-full hover:bg-amber-700 text-gray-800 font-bold transition"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="nav-item px-3 py-2 rounded-full hover:bg-amber-700 text-gray-800 font-bold transition"
        >
          About
        </Link>
        <Link
          href="/services"
          className="nav-item px-3 py-2 rounded-full hover:bg-amber-700 text-gray-800 font-bold transition"
        >
          Services
        </Link>
        <Link
          href="/Store"
          className="nav-item px-3 py-2 rounded-full hover:bg-amber-700 text-gray-800 font-bold transition"
        >
          Store
        </Link>
        <Link
          href="/Contact"
          className="nav-item px-3 py-2 rounded-full hover:bg-amber-700 text-gray-800 font-bold transition"
        >
          Contact
        </Link>
        {!isLoggedIn ? (
          <>
            <Link
              href="/login"
              className="nav-item px-3 py-2 rounded-full hover:bg-amber-700 text-gray-800 font-bold transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="nav-item px-3 py-2 rounded-full hover:bg-amber-700 text-gray-800 font-bold transition"
            >
              Signup
            </Link>
          </>
        ) : (
          <Link
            href="/profile"
            className="nav-item px-3 py-2 rounded-full hover:bg-amber-700 text-gray-800 font-bold transition"
          >
            Profile
          </Link>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-amber-700"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
        <div className="hidden md:flex items-center space-x-2">
          <Link
            href="/search"
            className="p-2 rounded-full hover:bg-amber-700 transition focus:outline-none focus:ring-2 focus:ring-amber-700"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="10.5" cy="10.5" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
          </Link>
          <Link
            href="/Cart"
            className="p-2 rounded-full hover:bg-amber-700 transition focus:outline-none focus:ring-2 focus:ring-amber-700"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h1l.4 1.2 1 2.5H19l.4-1.2 1-2.5h1M10 20a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}
