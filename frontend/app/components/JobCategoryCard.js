"use client";

import { ItSvg } from "@/public/images/SVG/svg";
import React, { useState } from "react";


const JobCategoryCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="py-5 px-16 text-center hover:shadow-lg bg-white cursor-pointer"
      style={{
        transition: "box-shadow 0.3s ease",
        boxShadow: isHovered ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-center py-2">
        <ItSvg />
      </div>
      <p className="text-black text-lg">IT Engineer</p>
      <p
        className="text-xs font-semibold"
        style={{ color: isHovered ? "#007BFF" : "inherit" }}
      >
        3 open positions
      </p>
    </div>
  );
};

export default JobCategoryCard;
