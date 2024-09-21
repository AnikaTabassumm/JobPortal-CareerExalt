'use client';

import React, { useRef } from "react";
import { SigninButton } from "./Button";
import Link from "next/link";
import Image from "next/image";
import RegistrationForm from "./Registration";
import { ProfileSvg } from "../public/images/SVG/svg";

const LandingPageNavbar = () => {
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
            onClick={handleOpenModal}
          >
            <ProfileSvg size={"28"} />
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box bg-white p-0 max-h-screenw-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%]">
              <form method="dialog" className="relative">
                {/* if there is a button in form, it will close the modal */}
              </form>
              <RegistrationForm ref={registrationFormRef} />
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default LandingPageNavbar;