import React from "react";
import featureImageLight from "../utils/images/features-light.svg";
import featureImageDark from "../utils/images/features-dark.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const FeatureSection = ({ isDarkMode }) => {
     useEffect(() => {
        AOS.init({
          duration: 500,
          easing: "ease-in-out",
          once: false,
        });
      }, []);
  return (
    <section
      id="feature"
      className="flex flex-col lg:flex-row items-center justify-between gap-20 px-6 sm:px-10 py-20 lg:pt-60"
    >
      {/* Left Side: Image */}
      <div data-aos="fade-right" className="w-full lg:w-3/5 flex items-center justify-center order-last lg:order-first">
        <img
          src={isDarkMode ? featureImageDark : featureImageLight}
          alt="Feature Illustration"
          className="w-full max-w-md h-auto"
        />
      </div>

      {/* Right Side: Text Content */}
      <div className="w-full lg:w-2/5  sm:text-left lg:text-left">
        <h2 data-aos="fade-up" className="text-4xl  pl-20 font-bold mb-6">Features</h2>
        <ul className="space-y-4 text-gray-600 dark:text-gray-400">
          {[
            "Manage and share multiple links effortlessly in one place.",
            "Easy-to-share customizable page with a single URL.",
            "Toggle between dark mode and light mode for personalized use.",
            "Track profile views with detailed analytics and rankings.",
            "Interactive and responsive UI/UX for seamless navigation.",
            "Simple, secure, and optimized for all devices.",
          ].map((feature, index) => (
            <li data-aos="fade-up" data-aos-delay={200+index*100}
              key={index}
              className="flex items-center gap-2 lg:text-md sm:text-md sm:text-left"
            >
              <div className="w-4 h-4 bg-custom-green rounded-full flex-shrink-0"></div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeatureSection;
