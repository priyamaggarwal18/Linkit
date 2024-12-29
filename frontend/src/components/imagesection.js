import React from "react";
import { useEffect } from "react";
import demo from "../utils/images/demo.svg";
import AOS from "aos";
import "aos/dist/aos.css";

const ImageSection = ({ isDarkMode }) => {
      useEffect(() => {
        AOS.init({
          duration: 1000,
          easing: "ease-in-out",
          once: false,
        });
      }, []);
  return (
    <section
      className={`flex items-center justify-center py-10 ${
        isDarkMode ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <div data-aos="fade-up" data-aos-delay="200" className="w-full max-w-6xl px-4">
        <img
          src={demo}
          alt="demo"
          className="w-full h-auto object-contain rounded-lg "
        />
      </div>
    </section>
  );
};

export default ImageSection;
