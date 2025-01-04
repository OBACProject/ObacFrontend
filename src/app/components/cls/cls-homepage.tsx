"use client";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ".././styles.css";

export default function CLShomepage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={`animate-fastFade transition-opacity  w-full duration-1000${
        isLoaded ? "animate-fadeIn" : "opacity-0"
      }`}
    >
      <Carousel
        autoPlay={true}
        interval={5000}
        width="full"
        autoFocus={false}
        infiniteLoop={true}
        showArrows={false}
        showThumbs={false}
        dynamicHeight={false}
        swipeable={true}
        stopOnHover={false}
      >
        <div className="overflow-hidden relative ">
          <img
            src="/cls/slide04.jpg"
            alt="slide2"
            className=" w-full h-40 md:h-72 sm:h-56 lg:h-80 object-cover transition duration-700"
          />
          <p className="legend">Our Service</p>
        </div>
        <div className="overflow-hidden relative ">
          <img
            src="/cls/slide04.jpg"
            alt="slide2"
            className=" w-full lg:h-80 h-40 sm:h-56  md:h-72 object-cover transition duration-700"
          />
          <p className="legend">Our Service</p>
        </div>
        <div className="overflow-hidden relative ">
          <img
            src="/cls/slide04.jpg"
            alt="slide2"
            className=" w-full lg:h-80 h-40 sm:h-56  md:h-72 object-cover transition duration-700"
          />
          <p className="legend">Our Service</p>
        </div>
        <div className="overflow-hidden relative ">
          <img
            src="/cls/slide04.jpg"
            alt="slide2"
            className=" w-full lg:h-80 h-40 sm:h-56  md:h-72 object-cover transition duration-700"
          />
          <p className="legend">Our Service</p>
        </div>


      </Carousel>
  </div>
  );
}
