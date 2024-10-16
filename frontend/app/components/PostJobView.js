"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackages } from "@/store/slices/packageSlice";
import { setUserInfo } from "@/store/slices/userSlice";
import JobPostForm from "./JobPostForm";
import { createOrder } from "@/store/slices/orderSlice";

const PostJobView = () => {
 


  const dispatch = useDispatch();
  const { packages, loading, error } = useSelector((state) => state.packages);
  const { userInfo } = useSelector((state) => state.user);
  const { employer } = useSelector((state) => state.employer);
  const [postJob, setPostJob] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packId, setPackId] = useState("");
  const [empId, setEmpId] = useState("")

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  // useEffect(() => {
  //   const localUserInfo =
  //     typeof window !== "undefined"
  //       ? JSON.parse(localStorage.getItem("userInfo"))
  //       : null;

  
  //   if (!userInfo && localUserInfo) {
  //     dispatch(setUserInfo(localUserInfo));
  //   }
  // }, [dispatch, userInfo]);

  useEffect(() => {
    console.log("USER: ", employer)
    setEmpId(employer?.data?.userId)
  }, [employer])
  useEffect(() => {
    console.log("PACK: ", packages)
  }, [packages])
  console.log('pack: ', packId)

  const handlePackageChange = (id) => {
    setSelectedPackage(id);
  };

  const handleProceed = (id) => {
    console.log("id: ", id)
    setPackId(id);
    setPostJob(true);
    
  };

  return (
    <div>
      {!postJob ? (
        <div className="flex justify-center items-center bg-gray-100 py-8 ">
          <div className="w-full max-w-3xl px-4">
            <h1 className="text-2xl font-semibold text-center mb-6">
              Select a Package
            </h1>

            {/* Handle loading and error states */}
            {loading ? (
              <p className="text-center">Loading packages...</p>
            ) : error ? (
              <p className="text-center text-red-500">Error: {error}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packages.map((pkg) => (
                  <label
                    key={pkg.id}
                    className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow duration-300"
                  >
                    <input
                      type="radio"
                      name="package"
                      value={pkg.id}
                      checked={selectedPackage === pkg.id}
                      onChange={() => handlePackageChange(pkg.id)}
                      className="hidden"
                    />
                    <div
                      className={`border-2 rounded-lg p-4 ${
                        selectedPackage === pkg.id
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      <div className="text-lg font-semibold text-gray-700">
                        {pkg.name}
                      </div>
                      <div className="font-semibold text-gray-700 text-lgl">
                        Visibility: {pkg.postVisibilityDays} days
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mt-2">
                        {pkg.price} Bdt
                      </div>
                      {/* <ul className="mt-4 text-sm text-gray-600">
                           {pkg.map((feature, index) => (
                             <li key={index} className="flex items-center">
                               <span className="mr-2">✔</span>
                               {feature}
                             </li>
                           ))}
                         </ul> */}
                    </div>
                  </label>
                ))}
              </div>
            )}

            {selectedPackage && (
              <div className="mt-8 text-center">
                {packages.find((pkg) => pkg.id === selectedPackage)
                  ? // Retrieve the selected package
                    (() => {
                      const selectedPkg = packages.find(
                        (pkg) => pkg.id === selectedPackage
                      );
                      return (
                        <button
                          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300"
                          onClick={() => handleProceed(selectedPkg.id)}
                        >
                          Proceed with {selectedPkg.name} Package
                        </button>
                      );
                    })()
                  : ""}
              </div>
            )}
          </div>
        </div>
      ) : (
        <JobPostForm packageId={packId} employerId={empId} />
      )}
    </div>
  );
};

export default PostJobView;
