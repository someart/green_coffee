import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blur bg-opacity-90 backdrop-blur-lg rounded-full px-4 shadow-lg flex items-center justify-between gap-4 z-50">
      <div className="flex items-center">
        <Image
          src="/Logo/Logo.png" // Path to your logo image
          alt="Company Logo" // Alt text for accessibility
          width={100} // Adjusted width
          height={50} // Adjusted height
          className="object-contain" // Optional: to maintain aspect ratio
        />
      </div>
      <div className={`flex-col md:flex md:flex-row md:space-x-4 items-center ${isOpen ? 'flex' : 'hidden'} md:block`}>
        <Link href="/" className="nav-item px-3 py-2 rounded-full hover:bg-gray-200 transition">
          <span className="font-bold text-gray-800">Home</span>
        </Link>
        <Link href="/about" className="nav-item px-3 py-2 rounded-full hover:bg-gray-200 transition">
          <span className="font-bold text-gray-800">About Us</span>
        </Link>
        <Link href="/services" className="nav-item px-3 py-2 rounded-full hover:bg-gray-200 transition">
          <span className="font-bold text-gray-800">Services</span>
        </Link>
        <Link href="/store" className="nav-item px-3 py-2 rounded-full hover:bg-gray-200 transition">
          <span className="font-bold text-gray-800">Store</span>
        </Link>
        <Link href="/contact" className="nav-item px-3 py-2 rounded-full hover:bg-gray-200 transition">
          <span className="font-bold text-gray-800">Contact Us</span>
        </Link>
      </div>
      <div className="flex items-center md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
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
      <div className="hidden md:flex items-center">
        <Link href="/search" className="p-2 rounded-full hover:bg-gray-200 transition">
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
        <Link href="/cart" className="p-2 rounded-full hover:bg-gray-200 transition">
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 3h1l.4 1.2 1 2.5H19l.4-1.2 1-2.5h1" />
            <circle cx="10" cy="20" r="1" />
            <circle cx="17" cy="20" r="1" />
          </svg>
        </Link>
      </div>
    </nav>
  );
}