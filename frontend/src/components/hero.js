import React from "react";
import landingimg from "../utils/images/landing.svg";
import landingimgdark from "../utils/images/landing-dark.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const HeroComponent = ({ isDarkMode }) => {
  const handleSeeDemo = () => {
    window.open("/profile/priyam08", "_blank");
  };
  const handleLogin = () => {
    window.open("/login", "_blank");
  };
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  return (
    <section id="home" className="flex flex-col gap-6 lg:mx-20 sm:mx-5 lg:flex-row items-center justify-center px-6 sm:px-10 min-h-screen">
      {/* Left Side: Text and Buttons */}
      <div className="lg:w-1/2 text-justify sm:text-left">
        <h1 data-aos="fade-up" className="text-4xl pt-10 sm:text-5xl font-bold mb-4 text-center sm:text-left">
          One Link,<br />Endless Possibilities
        </h1>
        <p data-aos="fade-up"  data-aos-delay="200" className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          LinkIt is your all-in-one platform to share, manage, and track your
          links seamlessly. Simplify your online presence with a single
          customizable page that connects your audience to everything you offer!
        </p>
        <div className="flex flex-wrap justify-center sm:justify-start gap-4">
          {/* Make Your Own Button */}
          <button data-aos="fade-up" data-aos-delay="200"
            onClick={handleLogin}
            className="h-12 w-40 bg-custom-green text-white rounded flex items-center justify-center font-semibold hover:bg-custom-green hover:opacity-70 transition-all"
          >
            Make Your Own
          </button>

          {/* See Demo Button */}
          <button data-aos="fade-up" data-aos-delay="300"
            onClick={handleSeeDemo}
            className="h-12 w-40 border-2 border-custom-green text-custom-green rounded flex items-center justify-center font-semibold bg-transparent"
          >
            See Demo
          </button>
        </div>
      </div>

      {/* Right Side: Image */}
      <div  data-aos="fade-left" className="lg:w-1/2 hidden sm:flex">
        <div className="w-full max-w-md mx-auto rounded flex items-center justify-center">
          <img
            src={isDarkMode ? landingimgdark : landingimg}
            alt="Hero Image"
            className="w-full scale-110 h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
