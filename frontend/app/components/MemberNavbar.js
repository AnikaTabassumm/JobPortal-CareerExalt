'use client';

import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '@/store/slices/userSlice';
import { ProfileSvg } from "@/public/images/SVG/svg";

const MemberNavbar = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());

  };

  return (
    <div className="bg-white fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="navbar py-0 px-5">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="4 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="text-gray-500 font-bold menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/">HOME</Link>
              </li>
              <li>
                <a>ABOUT US</a>
              </li>
              <li>
                <a>JOBS</a>
              </li>
              <li>
                <a>CONTACT US</a>
              </li>
            </ul>
          </div>
          <Link href="/">
            <Image
              src="/images/careerBridge.png"
              alt="CareerExalt"
              width={200}
              height={20}
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="text-gray-500 font-bold menu menu-horizontal px-1">
            <li>
              <Link href="/">HOME</Link>
            </li>
            <li>
              <Link href="/jobs">JOBS</Link>
            </li>
            <li>
              <Link href="/companies">COMPANIES</Link>
            </li>
            <li>
              <Link href="/contact">CONTACT US</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
        <button onClick={handleLogout} disabled={loading}>
        <Link href="/">{loading ? 'Logging out...' : 'Logout'}</Link>
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default MemberNavbar;
