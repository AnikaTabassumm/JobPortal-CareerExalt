"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "@/store/slices/userSlice";
import Link from "next/link";
import {
  AppliedJobSvg,
  DashboardSvg,
  ProfileSvg,
} from "@/public/images/SVG/svg";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const localUserInfo =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;
    if (!userInfo && localUserInfo) {
      dispatch(setUserInfo(localUserInfo));
    }
    setRole(userInfo?.role || localUserInfo?.role);
  });
  return (
    <div className="flex">
      <div
        className={`h-screen bg-gray-800 text-white space-y-6 px-2 py-7 mt-16 fixed inset-y-0 left-0 transform ${
          isOpen ? "w-64" : "w-12 md:w-16"
        } transition-all duration-300 ease-in-out z-40`}
      >
        <nav>
          <Link href={`/${role}/dashboard`}>
            <p
              className={`flex items-center p-1 rounded transition duration-200 hover:bg-gray-700 ${
                isOpen ? "j" : "justify-center"
              }`}
            >
              <DashboardSvg isOpen={isOpen} />
              {isOpen && <span className="ml-2 text-lg">Dashboard</span>}
            </p>
          </Link>
          {role !== "admin" ? (
            role === "candidate" ? (
              <Link href="/candidate/appliedjobs">
                <p
                  className={`flex items-center p-1 rounded transition duration-200 hover:bg-gray-700 ${
                    isOpen ? "" : "justify-center"
                  }`}
                >
                  <AppliedJobSvg isOpen={isOpen} />
                  {isOpen && <span className="ml-3 text-lg">Applied Jobs</span>}
                </p>
              </Link>
            ) : (
              <>
                <Link href="/employer/jobposts">
                  <p
                    className={`flex items-center p-1 rounded transition duration-200 hover:bg-gray-700 ${
                      isOpen ? "" : "justify-center"
                    }`}
                  >
                    <AppliedJobSvg isOpen={isOpen} />
                    {isOpen && <span className="ml-3 text-lg">Job Posts</span>}
                  </p>
                </Link>
                <Link href="/employer/postjob">
                  <p
                    className={`flex items-center p-1 rounded transition duration-200 hover:bg-gray-700 ${
                      isOpen ? "" : "justify-center"
                    }`}
                  >
                    <AppliedJobSvg isOpen={isOpen} />
                    {isOpen && (
                      <span className="ml-3 text-lg">Create Post</span>
                    )}
                  </p>
                </Link>
              </>
            )
          ) : (
            <>
              {/* <Link href="/admin/approvepost">
                <p
                  className={`flex items-center p-1 rounded transition duration-200 hover:bg-gray-700 ${
                    isOpen ? "" : "justify-center"
                  }`}
                >
                  <AppliedJobSvg isOpen={isOpen} />
                  {isOpen && (
                    <span className="ml-3 text-lg">Approve posts</span>
                  )}
                </p>
              </Link> */}
              <Link href="/admin/setpackage">
                <p
                  className={`flex items-center p-1 rounded transition duration-200 hover:bg-gray-700 ${
                    isOpen ? "" : "justify-center"
                  }`}
                >
                  <AppliedJobSvg isOpen={isOpen} />
                  {isOpen && (
                    <span className="ml-3 text-lg">Manage Package</span>
                  )}
                </p>
              </Link>
              {/* <Link href="/admin/manage-employer">
                <p
                  className={`flex items-center p-1 rounded transition duration-200 hover:bg-gray-700 ${
                    isOpen ? "" : "justify-center"
                  }`}
                >
                  <AppliedJobSvg isOpen={isOpen} />
                  {isOpen && (
                    <span className="ml-3 text-lg">Manage Employer</span>
                  )}
                </p>
              </Link> */}
              {/* <Link href="/admin/manage-candidate">
                <p
                  className={`flex items-center p-1 rounded transition duration-200 hover:bg-gray-700 ${
                    isOpen ? "" : "justify-center"
                  }`}
                >
                  <AppliedJobSvg isOpen={isOpen} />
                  {isOpen && (
                    <span className="ml-3 text-lg">Manage Candidate</span>
                  )}
                </p>
              </Link> */}
            </>
          )}

          <Link href={`/${role}/profile`}>
            <p
              className={`flex items-center p-1 rounded transition duration-200 hover:bg-gray-700 ${
                isOpen ? "" : "justify-center"
              }`}
            >
              <ProfileSvg width={32} height={29} fill={"#f3f4f6"} />
              {isOpen && <span className="ml-4">My Profile</span>}
            </p>
          </Link>
          {/* <Link href="/">
            <p
              className={`flex items-center p-1 rounded transition duration-200 hover:bg-gray-700 ${
                isOpen ? '' : 'justify-center'
              }`}
            >
              {isOpen && <span className="ml-4">Logout</span>}
            </p>
          </Link>
          <Link href="/messages">
            <p
              className={`flex items-center p-1 rounded transition duration-200 hover:bg-gray-700 ${
                isOpen ? '' : 'justify-center'
              }`}
            >
              {isOpen && <span className="ml-4">Messages</span>}
            </p>
          </Link> */}
        </nav>
      </div>

      {/* Toggle button */}
      <div
        className={`fixed top-16 ${
          isOpen ? "left-64" : "left-16 md:left-16"
        } transition-all duration-300 z-50`}
      >
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
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
