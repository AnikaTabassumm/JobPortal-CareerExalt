"use client";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { RoleButton, SigninButton, SignupButton } from "./Button";
import { EmployerSvg, JobseekerSvg, LockSvg, ProfileSvg } from "../public/images/SVG/svg";
// import {
//   EmployerSvg,
//   JobseekerSvg,
//   LockSvg,
//   ProfileSvg,
// } from "@/public/images/SVG/svg";

const RegistrationForm = forwardRef((props, ref) => {
  const [isJobseeker, setIsJobseeker] = useState(false);
  const [isEmployer, setIsEmployer] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [Role, setRole] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [forgetPass, setForgetPass] = useState(false);

  const handleJobseekerClick = () => {
    setIsJobseeker(true);
    setIsEmployer(false);
    setRole("Job Seeker");
  };
  const handleEmployerClick = () => {
    setIsEmployer(true);
    setIsJobseeker(false);
    setRole("Employer");
  };
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  }
  const handleGoBack = () => {
    setForgetPass(false);  
  };

  useImperativeHandle(ref, () => ({
    resetForm() {
      setIsSignedUp(true);
      setIsJobseeker(false);
      setIsEmployer(false);
      setIsChecked(false);
      setRole("")
    }
  }))

  return (
    <div className="overflow-hidden">
      <div
        style={{
          backgroundColor: "#324888",
          position: "sticky",
          top: "0",
        }}
      >
        <h1 className="py-7 text-center font-bold text-2xl text-white">
          {forgetPass ? "Forgot password" : isSignedUp ? "SIGN IN" : "SIGN UP"}
        </h1>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-6 top-7 border-gray-200"
          onClick={() => document.getElementById("my_modal_3").close()}
        >
          ✕
        </button>
      </div>

      {forgetPass ? (
        <div className="bg-white px-4 pb-2">
          <form className="p-4 flex flex-col">
          <label
              htmlFor="email"
              className="block font-medium py-3 text-gray-600"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="px-3 block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 focus:outline-none"
            />
            <div className="flex my-4">
              <SigninButton title={"Reset Password"}/>
            </div>
            <a href="" onClick={handleGoBack} className="text-gray-600">Go back</a>
          </form>
        </div>)
      : (!isSignedUp ? (
        <div className="bg-white p-4">
          <div className="flex flex-wrap justify-around pb-4">
            <RoleButton
              image={<JobseekerSvg />}
              title={"Register as Job Seeker"}
              role={"Jobseeker"}
              onClick={handleJobseekerClick}
            />
            <RoleButton
              image={<EmployerSvg />}
              title={"Register as Employer"}
              role={"Employer"}
              onClick={handleEmployerClick}
            />
          </div>
          {(isJobseeker || isEmployer) && (
            <form className=" p-4 flex flex-col">
              <label
                htmlFor="name"
                className="block font-medium pb-2 text-gray-600"
              >
                Full Name:
              </label>
              <input
                id="name"
                name="name"
                type="string"
                autoComplete="full-name"
                placeholder="Enter your full name"
                className="px-3 block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 focus:outline-none"
              />
              {/* {error?.name && (
                <div className="px-4 py-2 text-xs text-red-800 rounded-lg bg-red-50">
                  Full name is required!
                </div>
              )} */}
              <label
                htmlFor="email"
                className="block font-medium py-3 text-gray-600"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                className="px-3 block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 focus:outline-none"
              />
              {/* {error?.email && (
            <div className="px-4 py-2 text-xs text-red-800 rounded-lg bg-red-50">
              {error.email}
            </div>
          )} */}
              <label
                htmlFor="password"
                className="block font-medium py-3 text-gray-600"
              >
                Password
              </label>
              <div className="flex justify-between items-center px-3  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                <input
                  id="password"
                  name="password"
                  // type={showPassword ? "text" : "password"}
                  autoComplete="password"
                  placeholder="Enter a password"
                  className=" bg-white block focus:ring-transparent focus:outline-none w-full"
                />
                {/* <div onClick={onShowPassword}>
              {showPassword ? <FaEye /> : <IoEyeOffSharp />}
            </div> */}
                {/* {error?.password && Object.keys(error.password).length > 0 && (
              <div className="px-4 py-2 text-xs text-red-800 rounded-lg bg-red-50">
                <ul className="list-disc list-inside">
                  {Object.values(error.password).map((err, index) => (
                    <li key={index} className="px-2">
                      {err}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
              </div>
              <label
                htmlFor="passwordConfirm"
                className="block font-medium py-3 text-gray-600"
              >
                Password Confirm
              </label>
              <div className="flex justify-between items-center px-3  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  // type={showConfirmPass ? "text" : "password"}
                  autoComplete="password"
                  placeholder="Enter a password"
                  className=" bg-white block focus:ring-transparent focus:outline-none w-full"
                />
                {/* <div onClick={onShowConfirmPass}>
                {showConfirmPass ? <FaEye /> : <IoEyeOffSharp />}
              </div> */}
              </div>
              {/* {error?.passwordConfirm && (
              <div className="px-4 py-2 text-xs text-red-800 rounded-lg bg-red-50">
                Password and confirm password do not match.
              </div>
            )} */}
              {isEmployer && (
                <div>
                  <label
                    htmlFor="role"
                    className="block font-medium py-3 text-gray-600"
                  >
                    Role:
                  </label>
                  <p
                    id="role"
                    name="role"
                    type="string"
                    className="h-9 px-3 block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 focus:outline-none"
                  >
                    {Role}
                  </p>
                  <label
                    htmlFor="companyName"
                    className="block font-medium py-3 text-gray-600"
                  >
                    Company Name:
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="string"
                    placeholder="Enter your company name"
                    className="px-3 block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 focus:outline-none"
                  />
                  <label
                    htmlFor="industry"
                    className="block font-medium py-3 text-gray-600"
                  >
                    Industry Type:
                  </label>
                  <input
                    id="industry"
                    name="industry"
                    type="string"
                    className="px-3 block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 focus:outline-none"
                  />
                  <label
                    htmlFor="size"
                    className="block font-medium py-3 text-gray-600"
                  >
                    Company Size:
                  </label>
                  <input
                    id="size"
                    name="size"
                    type="string"
                    placeholder="No. of employees"
                    className="px-3 block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 focus:outline-none"
                  />
                  <label
                    htmlFor="contact"
                    className="block font-medium py-3 text-gray-600"
                  >
                    Contact Number:
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="string"
                    placeholder="Enter company contact no."
                    className="px-3 block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 focus:outline-none"
                  />
                  <label
                    htmlFor="description"
                    className="block font-medium py-3 text-gray-600"
                  >
                    Company Description:
                  </label>
                  <input
                    id="description"
                    name="description"
                    type="string"
                    placeholder="Enter company description"
                    className="px-3 block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 focus:outline-none"
                  />
                </div>
              )}
              {isJobseeker && (
                <div>
                  <label
                    htmlFor="role"
                    className="block font-medium py-3 text-gray-600"
                  >
                    Role:
                  </label>
                  <p
                    id="role"
                    name="role"
                    type="string"
                    className="h-9 px-3 block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 focus:outline-none"
                  >
                    {Role}
                  </p>
                </div>
              )}
              <div className="flex gap-2 pt-4 pb-5">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="checkbox border-2 border-gray-300 rounded-sm"
                />
                <label>By signup you agree to our Privacy Policy </label>
              </div>
              <div className="flex">
                <SignupButton title={"Register"} activity={!isChecked} />
              </div>
            </form>
          )}
          <button className="ps-3 flex gap-2" onClick={() => setIsSignedUp(true)}>
            <ProfileSvg size={21} />
            <p className="text-sm text-gray-500 hover:text-blue-600">Already have an account?</p>
          </button>
          <button className="ps-3 py-3 flex gap-2" onClick={() => setForgetPass(true)}>
            <LockSvg />
            <p className="text-sm text-gray-500 hover:text-blue-600">Forget password?</p>
          </button>
        </div>
      ) : (
        <div className="bg-white px-4 pb-4">
          <form className=" p-4 flex flex-col">
            <label
              htmlFor="email"
              className="block font-medium py-3 text-gray-600"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="px-3 block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 focus:outline-none"
            />
            {/* {error?.email && (
            <div className="px-4 py-2 text-xs text-red-800 rounded-lg bg-red-50">
              {error.email}
            </div>
          )} */}
            <label
              htmlFor="password"
              className="block font-medium py-3 text-gray-600"
            >
              Password
            </label>
            <div className="flex justify-between items-center px-3  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
              <input
                id="password"
                name="password"
                // type={showPassword ? "text" : "password"}
                autoComplete="password"
                placeholder="Enter a password"
                className=" bg-white block focus:ring-transparent focus:outline-none w-full"
              />
              {/* <div onClick={onShowPassword}>
              {showPassword ? <FaEye /> : <IoEyeOffSharp />}
            </div> */}
              {/* {error?.password && Object.keys(error.password).length > 0 && (
              <div className="px-4 py-2 text-xs text-red-800 rounded-lg bg-red-50">
                <ul className="list-disc list-inside">
                  {Object.values(error.password).map((err, index) => (
                    <li key={index} className="px-2">
                      {err}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
            </div>

            <div className="flex mt-5">
              <SigninButton title={"Login"} />
            </div>
          </form>
          <button className="ps-4 flex gap-2" onClick={() => setIsSignedUp(false)}>
            <ProfileSvg size={21} />
            <p className="text-sm text-gray-500 hover:text-blue-600">Don't have an account?</p>
          </button>
          <button className="ps-4 py-3 flex gap-2" onClick={() => setForgetPass(true)}>
            <LockSvg />
            <p className="text-sm text-gray-500 hover:text-blue-600">Forget password?</p>
          </button>
        </div>
      ))}
    </div>
  );
});

export default RegistrationForm;