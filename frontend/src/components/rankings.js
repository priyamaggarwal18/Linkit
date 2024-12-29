import React from "react";
import rankingImage from "../utils/images/rankings.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const RankingSection = ({ isDarkMode }) => {
  const handleRanking = () => {
    window.open("/rankings", "_blank");
  };
  useEffect(() => {
          AOS.init({
            duration: 500,
            easing: "ease-in-out",
            once: false,
          });
        }, []);
  return (
    <section
      id="ranking"
      className="flex flex-col lg:flex-row items-center justify-between gap-10   lg:px-20 sm:px-5 py-20 lg:py-40  "
    >
      {/* Left Side: Heading, Subheading, and Button */}
      <div className="lg:w-1/2  lg:px-20  flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
        <h2 data-aos="fade-up" className="text-4xl font-bold mb-6">Profile Rankings</h2>
        <p data-aos="fade-up" data-aos-delay="200" className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Explore the most popular profiles ranked by views. See who’s leading
          and get inspired to boost your own profile.
        </p>
        <button data-aos="fade-up" data-aos-delay="300" onClick={handleRanking} className="px-8 py-3 bg-custom-green text-white font-semibold rounded-md">
          View Popular Profiles
        </button>
      </div>

      {/* Right Side: Image */}
      <div data-aos="fade-left" className="lg:w-1/2 flex items-center justify-center">
        <img
          src={rankingImage}
          alt="Ranking Illustration"
          className="w-full scale-90 max-w-lg h-auto"
        />
      </div>
    </section>
  );
};

export default RankingSection;
