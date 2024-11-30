"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SigninButton } from "./Button";
import Link from "next/link";
import Image from "next/image";
import jwt_decode from "jwt-decode";
import RegistrationForm from "./Registration";
import { LogoutSvg, ProfileSvg } from "@/public/images/SVG/svg";
import { logoutUser, setUserInfo } from "@/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getEmployer } from "@/store/slices/employerSlice";
import { fetchJobSeeker } from "@/store/slices/jobSeekerSlice";
import { fetchAdminDetails } from "@/store/slices/adminSlice";

const LandingPageNavbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(false);
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { employer, status, error } = useSelector((state) => state.employer);
  const { jobSeeker } = useSelector((state) => state.jobSeeker);
  const [loading, setLoading] = useState(true);
  const [picturePreview, setPicturePreview] = useState(
    "/images/defaultUser.png"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isTokenExpired = (token) => {
    if (!token) {
      setUser(false);
      return true;
    }

    // const decodedToken = jwt_decode(token);
    // const currentTime = Date.now() / 1000; // Current time in seconds
    // return decodedToken.exp < currentTime; // Token is expired if current time is greater than expiration time
  };

  useEffect(() => {
    const localUserInfo =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token && isTokenExpired(token)) {
      // Token is expired, log out the user
      handleLogout();
    } else {
      if (!userInfo && localUserInfo) {
        dispatch(setUserInfo(localUserInfo));
      }
      if (localUserInfo) {
        setUser(true);
      }

      if (localUserInfo?.id && localUserInfo?.role === "employer") {
        dispatch(getEmployer(localUserInfo.id)).finally(() => {
          setLoading(false);
          setRole("employer");
          setUser(true);
        });
      } else if (localUserInfo?.id && localUserInfo?.role === "candidate") {
        dispatch(fetchJobSeeker(localUserInfo.id)).finally(() => {
          setLoading(false);
          setRole("candidate");
          setUser(true);
        });
      } else if (localUserInfo?.id && localUserInfo?.role === "admin") {
        dispatch(fetchAdminDetails(localUserInfo.id)).finally(() => {
          setLoading(false);
          setRole("admin");
          setUser(true);
        });
      } else {
        setLoading(false);
      }
    }
  }, [dispatch, userInfo]);

  const handleLogout = () => {
    dispatch(logoutUser());
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("userInfo");
    setUser(false);
    setRole("");
    router.push("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleOptionClick = (path) => {
    if (router) {
      router.push(path);
      setDropdownOpen(false);
    }
  };

  const registrationFormRef = useRef(null);

  const handleOpenModal = () => {
    const modal = document.getElementById("my_modal_3");
    modal.showModal();

    // Reset the form state when opening the modal
    if (registrationFormRef.current) {
      registrationFormRef.current.resetForm();
    }
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
              className=" text-gray-500 font-bold menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/">HOME</Link>
              </li>

              <li>
                <Link href="/jobs">JOBS</Link>
              </li>
              <li>
                <Link href="/companies">COMPANIES</Link>
              </li>
              {/* <li>
                <Link href="/contactus">CONTACT US</Link>
              </li> */}
            </ul>
          </div>
          <Link href="/">
            <Image
              src="/images/career_exalt.png"
              alt="CareerExalt"
              width={200}
              height={200}
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className=" text-gray-500 font-bold menu menu-horizontal px-1">
            <li>
              <Link href="/">HOME</Link>
            </li>
            <li>
              <Link href="/jobs">JOBS</Link>
            </li>
            <li>
              <Link href="/companies">COMPANIES</Link>
            </li>
            {/* <li>
              <Link href="/contactus">CONTACT US</Link>
            </li> */}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            // User is logged in, check for role
            role === "employer" ? (
              // Employer-specific content
              <div className="flex items-center space-x-4">
                <div className="dropdown-container relative">
                  <button
                    className="flex gap-2 items-center border p-1 rounded"
                    onClick={toggleDropdown}
                  >
                    <img
                      src={`http://localhost:5000/${employer?.data?.companyLogo}`}
                      alt={employer?.data?.companyName}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <p className="text-gray-600 hidden md:block">
                      {employer?.data?.companyName}
                    </p>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 top-12 w-48 bg-white border rounded shadow-lg z-50">
                      <ul className="py-1">
                        <li>
                          <button
                            onClick={() =>
                              handleOptionClick("/employer/dashboard")
                            }
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            Dashboard
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              handleOptionClick("/employer/profile")
                            }
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            Profile
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              handleOptionClick("/employer/postjob")
                            }
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            Create Job
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              handleOptionClick("/employer/jobposts")
                            }
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            Your Jobs
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white py-1 px-2 rounded"
                >
                  <LogoutSvg />
                </button>
              </div>
            ) : role === "candidate" ? (
              // Candidate-specific content
              <div className="flex items-center space-x-4">
                <div className="dropdown-container relative">
                  <button
                    className="flex gap-2 items-center border p-1 rounded"
                    onClick={toggleDropdown}
                  >
                    <img
                      src={`http://localhost:5000/${jobSeeker.data.profilePicture}`}
                      alt={jobSeeker?.data?.userName}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <p className="text-gray-600 hidden md:block">
                      {jobSeeker?.data?.userName}
                    </p>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 top-12 w-48 bg-white border rounded shadow-lg z-50">
                      <ul className="py-1">
                        <li>
                          <button
                            onClick={() =>
                              handleOptionClick("/candidate/dashboard")
                            }
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            Dashboard
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              handleOptionClick("/candidate/profile")
                            }
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            Profile
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              handleOptionClick("/candidate/appliedjobs")
                            }
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            Applied Jobs
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white py-1 px-2 rounded"
                >
                  <LogoutSvg />
                </button>
              </div>
            ) : role === "admin" ? (
              // Admin-specific content
              <>
                <button
                  onClick={() => handleOptionClick("/admin/dashboard")}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white py-1 px-2 rounded"
                >
                  <LogoutSvg />
                </button>
              </>
            ) : null
          ) : (
            // Non-user content
            <>
              <button
                className="btn bg-white border-white hover:bg-white hover:border-white"
                onClick={handleOpenModal}
              >
                <ProfileSvg height={"28"} width={"28"} fill={"#4b5563"} />
              </button>
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box bg-white p-0 max-h-screenw-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%]">
                  <form method="dialog" className="relative"></form>
                  <RegistrationForm ref={registrationFormRef} />
                </div>
              </dialog>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPageNavbar;
