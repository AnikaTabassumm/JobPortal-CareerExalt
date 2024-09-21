'use client';

import Link from "next/link";
import Image from "next/image";
import { ProfileSvg } from "../public/images/SVG/svg";

const MemberNavbar = () => {
  return (
    <div className="border-white bg-white relative">
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
              className=" text-gray-500 font-bold menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
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
          <ul className=" text-gray-500 font-bold menu menu-horizontal px-1">
            <li>
              <Link href="/">HOME</Link>
            </li>
            <li>
              <Link href="/about">JOBS</Link>
            </li>
            <li>
              <Link href="/about">COMPANIES</Link>
            </li>
            <li>
              <Link href="/about">CONTACT US</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <button
            className="btn bg-white border-white hover:bg-white hover:border-white"
          >
            <ProfileSvg size={"28"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberNavbar;