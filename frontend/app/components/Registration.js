"use client";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { RoleButton, SigninButton, SignupButton } from "./Button";
import {
  EmployerSvg,
  JobseekerSvg,
  LeftArrowSvg,
  LockSvg,
  ProfileSvg,
} from "@/public/images/SVG/svg";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  loginUser,
  verifyOTP,
  sendResetPasswordEmail,
  resetPassword,
  setUserInfo,
} from "@/store/slices/userSlice";

const RegistrationForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  // const [isJobseeker, setIsJobseeker] = useState(false);
  // const [isEmployer, setIsEmployer] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  // const [Role, setRole] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [forgetPass, setForgetPass] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);

  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState(null);

  const [otpData, setOtpData] = useState({
    email: "",
    otp: "",
  });
  const [reqData, setReqData] = useState({
    email: "",
  });
  const [newPassData, setNewPassData] = useState({
    otp: "",
    newPassword: "",
  });

  const [isOtpSent, setIsOtpSent] = useState(false);

  const [newPass, setNewPass] = useState("");
  const [isReset, setIsReset] = useState(false);

  const handleJobseekerClick = () => {
    // setIsJobseeker(true);
    // setIsEmployer(false);
    // setRole("Job Seeker");
    setFormData({ ...formData, role: "jobseeker" });
  };
  const handleEmployerClick = () => {
    // setIsEmployer(true);
    // setIsJobseeker(false);
    // setRole("Employer");
    setFormData({ ...formData, role: "employer" });
  };
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const handleGoBack = () => {
    setForgetPass(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmPass = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      confirmPassword: value, // Update confirmPassword value
    });
    if (formData.password !== value) {
      setWrongPass(true);
    } else {
      setWrongPass(false);
    }
  };

  const handleOtpChange = (e) => {
    setOtpData({ ...otpData, [e.target.name]: e.target.value });
  };
  const handleResetChange = (e) => {
    setReqData({ ...reqData, [e.target.name]: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setNewPassData({ ...newPassData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSignedUp) {
      dispatch(registerUser(formData)).then(() => setIsOtpSent(true));
    } else {
      // Optional frontend validation
      if (!formData.email || !formData.password) {
        setFormError("Please fill out both fields.");
        return;
      }
      setFormError(null); // Reset the error

      // Dispatch loginUser thunk
      try {
        const result = await dispatch(loginUser(formData)).unwrap();

        if (loginUser.rejected.match(result)) {

          alert(result.payload); 
        }
        else {
          setIsOtpSent(true);
        }

        // if (result) {
        //   setIsOtpSent(true);
    
        // }
      } catch (err) {
        // If there's a backend error (e.g., invalid credentials)
        setFormError(err.message || "Invalid email or password.");
      }
      // .then(() => setIsOtpSent(true));
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();

    dispatch(verifyOTP(otpData))
      .unwrap()
      .then((response) => {
        console.log('OTP verification response:', response)
        if (response?.userInfo) {
          console.log("Saving userInfo:", response.userInfo);
          // Dispatch action to save user info in userSlice
          dispatch(setUserInfo(response.userInfo));
          localStorage.setItem("userInfo", JSON.stringify(response.userInfo));
        }
        // if (response?.payload) {
          // const { redirectUrl } = response.payload; // Make sure this matches your API response
          // if (redirectUrl) {
          //   // Perform redirection logic
          //   window.location.href = redirectUrl; // or use react-router
          // }
        // }
        const redirectUrl = response.redirectUrl; // Adjusted to directly access redirectUrl
      if (redirectUrl) {
        console.log("Redirecting to:", redirectUrl);
        window.location.href = redirectUrl; // Redirect the user
      }
      })
      .catch((error) => {
        // Handle the error (optional)
        console.error("OTP verification failed:", error);
      });
  };

  const handleResetReqSubmit = (e) => {
    e.preventDefault();
    dispatch(sendResetPasswordEmail(reqData));
    setIsReset(true);
  };
  const handleNewPassSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(newPassData));
  };

  useImperativeHandle(ref, () => ({
    resetForm() {
      setIsChecked(false);
      setFormData({
        role: "",
        name: "",
        email: "",
        password: "",
      });
    },
  }));

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
          {forgetPass
            ? "Forgot password"
            : isOtpSent
            ? "OTP Verification"
            : isSignedUp
            ? "SIGN IN"
            : "SIGN UP"}
        </h1>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-6 top-7 border-gray-200"
          onClick={() => document.getElementById("my_modal_3").close()}
        >
          ✕
        </button>
      </div>

      {forgetPass ? (
        !isReset ? (
          <div className="bg-white px-4 pb-2">
            <form className="p-4 flex flex-col" onSubmit={handleResetReqSubmit}>
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
                onChange={handleResetChange}
                value={reqData.email}
                className="px-3 block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 focus:outline-none"
              />
              <div className="flex my-4">
                <SigninButton title={"Reset Password"} />
              </div>
              <a href="" onClick={handleGoBack} className="text-gray-600 flex">
                <LeftArrowSvg />
                Go back
              </a>
            </form>
          </div>
        ) : (
          <div className="bg-white px-4 pb-2">
            <form className="p-4 flex flex-col" onSubmit={handleNewPassSubmit}>
              <label
                htmlFor="otp"
                className="block font-medium py-3 text-gray-600"
              >
                Enter OTP:
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                placeholder="Enter the OTP"
                onChange={handlePasswordChange}
                value={newPassData.otp}
                className="px-3 block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm"
              />
              <label
                htmlFor="newPassord"
                className="block font-medium py-3 text-gray-600"
              >
                Enter New Password:
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="Enter new password"
                onChange={handlePasswordChange}
                value={newPassData.newPassword}
                className="px-3 block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm"
              />
              <div className="flex my-4">
                <button>
                  <SigninButton title={"Reset"} />
                </button>
              </div>
              {/* <a href="" onClick={handleGoBack} className="text-gray-600 flex"><LeftArrowSvg />Go back</a> */}
            </form>
          </div>
        )
      ) : !isOtpSent ? (
        !isSignedUp ? (
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

            <form className=" p-4 flex flex-col" onSubmit={handleSubmit}>
              <label
                htmlFor="role"
                className="block font-medium py-3 text-gray-600"
              >
                Role:
              </label>
              <input
                type="text"
                className="h-9 px-3 block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 focus:outline-none"
                value={formData.role}
                readOnly
              />

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
                onChange={handleChange}
                value={formData.name}
                className="px-3 block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 focus:outline-none"
              />
              {error?.name && (
                <div className="px-4 py-2 text-xs text-red-800 rounded-lg bg-red-50">
                  Full name is required!
                </div>
              )}
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
                onChange={handleChange}
                value={formData.email}
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
                  type="password"
                  autoComplete="password"
                  placeholder="Enter a password"
                  onChange={handleChange}
                  value={formData.password}
                  className=" bg-white block focus:ring-transparent focus:outline-none w-full"
                />
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
                  type="password"
                  autoComplete="password"
                  placeholder="Enter a password"
                  onChange={handleConfirmPass}
                  value={formData.confirmPassword}
                  className=" bg-white block focus:ring-transparent focus:outline-none w-full"
                />
              </div>
              <div>
                {wrongPass ? (
                  <p className="text-red-500">Password did not match</p>
                ) : (
                  formData.confirmPassword && <p>Password matched</p>
                )}
              </div>

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

            <button
              className="ps-3 flex gap-2"
              onClick={() => setIsSignedUp(true)}
            >
              <ProfileSvg width={21} height={21} fill={"#4b5563"} />
              <p className="text-sm text-gray-500 hover:text-blue-600">
                Already have an account?
              </p>
            </button>
            <button
              className="ps-3 py-3 flex gap-2"
              onClick={() => setForgetPass(true)}
            >
              <LockSvg />
              <p className="text-sm text-gray-500 hover:text-blue-600">
                Forget password?
              </p>
            </button>
          </div>
        ) : (
          <div className="bg-white px-4 pb-4">
            <form className=" p-4 flex flex-col" onSubmit={handleSubmit}>
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
                onChange={handleChange}
                value={formData.email}
                className="px-3 block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 focus:outline-none"
              />
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
                  type="password"
                  // type={showPassword ? "text" : "password"}
                  autoComplete="password"
                  placeholder="Enter a password"
                  onChange={handleChange}
                  value={formData.password}
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
              {error && (
                <div className="text-red-500">
                  {typeof error === "string" ? error : error.message}
                </div>
              )}

              <div className="flex mt-5">
                <SigninButton title={"Login"} />
              </div>
            </form>
            <button
              className="ps-4 flex gap-2"
              onClick={() => setIsSignedUp(false)}
            >
              <ProfileSvg height={21} width={21} fill={"#4b5563"} />
              <p className="text-sm text-gray-500 hover:text-blue-600">
                Don't have an account?
              </p>
            </button>
            <button
              className="ps-4 py-3 flex gap-2"
              onClick={() => setForgetPass(true)}
            >
              <LockSvg />
              <p className="text-sm text-gray-500 hover:text-blue-600">
                Forget password?
              </p>
            </button>
          </div>
        )
      ) : (
        <div className="bg-white p-4">
          <form onSubmit={handleOtpSubmit} className="p-4 flex flex-col">
            <label
              htmlFor="otp"
              className="block font-medium py-3 text-gray-600"
            >
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleOtpChange}
              value={otpData.email}
              className="px-3 block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm"
            />
            <label
              htmlFor="otp"
              className="block font-medium py-3 text-gray-600"
            >
              Enter OTP:
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              placeholder="Enter the OTP"
              onChange={handleOtpChange}
              value={otpData.otp}
              className="px-3 block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm"
            />

            <div className="flex mt-5">
              <SigninButton title={loading ? "Verifying..." : "Verify OTP"} />
            </div>
          </form>
        </div>
      )}
    </div>
  );
});
export default RegistrationForm;
