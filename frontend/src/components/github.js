import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const GitHubSection = () => {
    useEffect(() => {
        AOS.init({
          duration: 500,
          easing: "ease-in-out",
          once: false,
        });
      }, []);
  return (
    <section
      id="github"
      className="flex flex-col items-center justify-center text-center gap-8 px-6 sm:px-10 py-20 lg:pt-40"
    >
      {/* Heading */}
      <div>
        <h1 data-aos="fade-up" className="text-4xl font-bold mb-4">GitHub</h1>
        <p data-aos="fade-up" data-aos-delay="200" className="text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mx-20 lg:mx-60">
          All the source code for our project is available for free on our GitHub repository, where anyone can explore, learn from, and contribute to our work without any cost.
        </p>
      </div>

      {/* GitHub Badges */}
      <div data-aos="fade-up" data-aos-delay="300" className="flex flex-wrap justify-center gap-4">
        <img
          alt="GitHub repo size"
          src="https://img.shields.io/github/repo-size/priyamaggarwal18/Linkit?style=for-the-badge&color=darkgreen"
        />
        <img
          alt="GitHub Repo stars"
          src="https://img.shields.io/github/stars/priyamaggarwal18/Linkit?style=for-the-badge&color=darkgreen"
        />
        <img
          alt="GitHub forks"
          src="https://img.shields.io/github/forks/priyamaggarwal18/Linkit?style=for-the-badge&color=darkgreen"
        />
        <img
          alt="Last commit"
          src="https://img.shields.io/github/last-commit/priyamaggarwal18/Linkit?style=for-the-badge&color=darkgreen"
        />
      </div>

      {/* View Code Button */}
      <button data-aos="fade-up" data-aos-delay="400"
        onClick={() =>
          window.open("https://github.com/priyamaggarwal18/Linkit", "_blank")
        }
        className="px-8 py-3 bg-custom-green text-white font-semibold rounded-md hover:bg-green-600 transition-all"
      >
        View Code
      </button>
    </section>
  );
};

export default GitHubSection;
