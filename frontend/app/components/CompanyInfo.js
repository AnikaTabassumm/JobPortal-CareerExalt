'use client';

import { useEffect, useState } from 'react';
import EditCompanyProfile from './EditCompanyProfile';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '@/store/slices/userSlice';
import { deleteCompanyLogo, getEmployer, updateEmployer, uploadCompanyLogo } from '@/store/slices/employerSlice';
import { DeleteSvg, EditSvg } from '@/public/images/SVG/svg';


const CompanyInfo = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { employer, status, error } = useSelector((state) => state.employer);
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [logoEdit, setLogoEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [picturePreview, setPicturePreview] = useState(
    "/images/defaultUser.png"
  );

  useEffect(() => {
    const localUserInfo =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;

    if (!userInfo && localUserInfo) {
      dispatch(setUserInfo(localUserInfo));
    }

    if (localUserInfo?.id) {
      dispatch(getEmployer(localUserInfo.id)).finally(() => {
        setLoading(false); 
      });
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    console.log("User Info:", userInfo);
    console.log("Employer Data:", employer);
  }, [userInfo, employer]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("companyLogo", selectedFile);

    try {
      const response = await dispatch(
        uploadCompanyLogo({ id: employer.data.userId, formData })
      ).unwrap(); // Unwrap to directly get the fulfilled result

      if (response?.companyLogo) {

        setPicturePreview(`http://localhost:5000/${response.companyLogo}`);

        dispatch(getEmployer(userInfo.id)); 
      }
      setFile(null);
      setLogoEdit(false);
      alert("Company logo uploaded successfully!");
    } catch (error) {
      console.error("Error uploading company logo:", error);
      alert("Failed to upload image, please try again.");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete the logo?"
    );
    if (confirmed) {
      try {
        await dispatch(deleteCompanyLogo(employer.data.userId));
        await dispatch(getEmployer(userInfo.id));
        setPicturePreview("/images/defaultUser.png");
        setLogoEdit(true); // Optionally toggle edit mode
      } catch (error) {
        alert("Failed to delete profile picture. Please try again.");
      }
    }
  };


  const handleEditClick = () => setIsEditing(true);

  const handleSave = (updatedData) => {
    dispatch(updateEmployer({id: employer.data.userId, employerData: updatedData} ))
      .unwrap()
      .then(() => {
        setIsEditing(false); // Switch back to view mode after successful update
        dispatch(getEmployer(employer.data.userId));
        console.log('Updated Company Data:', updatedData);
      })
      .catch((error) => {
        console.error('Failed to update company profile:', error);
      });

    
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error?.message || "Failed to load data"}</div>;
  }

  if (!employer || !employer.data) {
    return <div>No company data found</div>;
  }

  return (
    <>
      {!isEditing ? (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-4 mb-6">
            {/* <Image
              src={companyData.companyLogo}
              alt="Company Logo"
              width={80}
              height={80}
              className="rounded-full"
            /> */}
            <div className="flex-col border">
            {logoEdit || !employer.data.companyLogo == null ? (
              <img
                src={picturePreview}
                width={150}
                height={150}
                alt="Profile"
                className=""
              />
            ) : (
              <img
                src={`http://localhost:5000/${employer.data.companyLogo}`}
                alt="Profile"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                }}
              />
            )}

            {/* Edit or Upload Profile Picture */}
            {logoEdit || !employer.data.companyLogo ? (
              <form className="flex-col">
                <input
                  type="file"
                  name="file"
                  className="text-xs"
                  onChange={handleFileChange}
                />
              </form>
            ) : (
              <div className="flex justify-between">
                <button
                  className="border-b-2 border-x-2"
                  onClick={handleDelete}
                >
                  <DeleteSvg />
                </button>
                <button
                className="border-b-2 border-x-2"
                onClick={()=> setLogoEdit(true)}
                >
                  <EditSvg />
                </button>
              </div>
            )}
          </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {employer.data.companyName}
              </h2>
              <p className="text-gray-600">{employer.data.industry}</p>
            </div>
          </div>
          <div className="space-y-4">
            <p>
              <strong className="text-gray-700">Size:</strong> {employer.data.size}
            </p>
            <p>
              <strong className="text-gray-700">Location:</strong> {employer.data.location}
            </p>
            <p>
              <strong className="text-gray-700">Contact Information:</strong>{' '}
              {employer.data.contactInformation}
            </p>
            <p>
              <strong className="text-gray-700">Description:</strong>{' '}
              {employer.data.companyDescription}
            </p>
           
          </div>
          <button
            onClick={handleEditClick}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <EditCompanyProfile companyData={employer} onSave={handleSave} />
      )}
    </>
  );
};

export default CompanyInfo;
