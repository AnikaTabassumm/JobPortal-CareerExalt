'use client';

import { useState } from 'react';
import Link from 'next/link';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`h-screen bg-gray-800 text-white space-y-6 px-2 py-7 absolute inset-y-0 left-0 transform ${
          isOpen ? 'w-64' : 'w-12'
        } transition-all duration-300 ease-in-out md:relative`}
      >
        {/* Logo */}
        {/* <div className={`flex items-center justify-center ${isOpen ? 'text-2xl' : 'text-sm'}`}>
          <span className="font-semibold">Dashboard</span>
        </div> */}

        {/* Navigation Links */}
        <nav>
          <Link href="/candidate/dashboard">
            <p
              className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
                isOpen ? '' : 'justify-center'
              }`}
            >
              {/* <FiHome className="text-xl" /> */}
              {isOpen && <span className="ml-4">Dashboard</span>}
            </p>
          </Link>
          <Link href="/candidate/appliedjobs">
            <p
              className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
                isOpen ? '' : 'justify-center'
              }`}
            >
              {/* <FiBriefcase className="text-xl" /> */}
              {isOpen && <span className="ml-4">Applied Jobs</span>}
            </p>
          </Link>
          <Link href="/profile">
            <p
              className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
                isOpen ? '' : 'justify-center'
              }`}
            >
              {/* <FiUser className="text-xl" /> */}
              {isOpen && <span className="ml-4">My Profile</span>}
            </p>
          </Link>
          <Link href="/settings">
            <p
              className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
                isOpen ? '' : 'justify-center'
              }`}
            >
              {/* <FiSettings className="text-xl" /> */}
              {isOpen && <span className="ml-4">Settings</span>}
            </p>
          </Link>
          <Link href="/messages">
            <p
              className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
                isOpen ? '' : 'justify-center'
              }`}
            >
              {/* <FiMessageSquare className="text-xl" /> */}
              {isOpen && <span className="ml-4">Messages</span>}
            </p>
          </Link>
        </nav>
      </div>

      {/* Toggle button */}
      <div className="absolute top-5 left-16 md:left-64">
        <button
          className="text-white px-4 py-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="#000000"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
