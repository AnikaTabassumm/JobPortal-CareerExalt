"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CompanyCard from "./CompanyCard";

const CompanyCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Disable arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false, // Disable arrows for this breakpoint too
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false, // Disable arrows for this breakpoint too
        },
      },
      {
        breakpoint: 464,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false, // Disable arrows for this breakpoint too
        },
      },
    ],
  };

  const items = [
    { img: "/images/heroSectionImg.png", name: "IT Engineer", positions: 3 },
    {
      img: "https://via.placeholder.com/300x150",
      name: "Web Developer",
      positions: 5,
    },
    {
      img: "https://via.placeholder.com/300x150",
      name: "Data Scientist",
      positions: 2,
    },
    {
      img: "https://via.placeholder.com/300x150",
      name: "Product Manager",
      positions: 4,
    },
  ];

  return (
    <div className="pt-5 mb-5">
      <Slider {...settings} rtl={false}>
        {items.map((item, index) => (
          <div key={index} className="flex justify-center gap-10 align-center">
            <CompanyCard
              img={item.img}
              name={item.name}
              positions={item.positions}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CompanyCarousel;
