import ApplicantList from "@/app/components/ApplicantList";
import Footer from "@/app/components/Footer";
import React from "react";

const page = ({ params }) => {
  const { id } = params;
  return (
    <div className="flex justify-center overflow-y-auto h-screen bg-gray-100">
      <div className="flex-grow py-16 px-6 md:px-22">
        <ApplicantList jobId={id} />
      </div>
    </div>
  );
};

export default page;
