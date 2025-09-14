import React, { useState, useEffect } from "react";
import { Button } from "../components/button";
import { darkButton } from "../components/darkButton";
import { useNavigate } from "react-router-dom";
import LinkItLogo from "../components/linkitLogo";
import { Footer } from "./Footer";
import { Analytics } from "@vercel/analytics/react"
import HeroComponent from "../components/hero";
import FeatureSection from "../components/features";
import ImageSection from "../components/imagesection";
import RankingSection from "../components/rankings";
import GitHubSection from "../components/github";

const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(prefersDarkScheme.matches);

    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    prefersDarkScheme.addEventListener("change", handleChange);
    return () => {
      prefersDarkScheme.removeEventListener("change", handleChange);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleNavigation = (link) => {
    navigate(link);
  };

  const links = [
    { name: "Home", id: "home" },
    { name: "Features", id: "feature" },
    { name: "Ranking", id: "ranking" },
    { name: "Github", id: "github" },
  ];

  return (
    <div
      className={`min-h-screen overflow-x-hidden ${
        isDarkMode ? "bg-black text-white" : "bg-green-100 text-black"
      }`}
    >
      <Analytics/>
      {/* Navbar */}
      <header
        className={`fixed py-3 top-0 left-0 right-0 z-50 w-full ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        } backdrop-blur-md shadow-md`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <LinkItLogo isDarkMode={isDarkMode} />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-6 md:gap-10">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="hover:text-custom-green transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {darkButton({ isDarkMode, toggleDarkMode })}
            <Button
              onClick={() => handleNavigation("/login")}
              className="border-2 border-custom-green text-buttons-primary py-2 px-4 rounded-md hover:text-custom-green transition-all"
            >
              Login
            </Button>
            <Button onClick={() => handleNavigation("/register")}>
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden focus:outline-none flex items-center"
          >
            <span className="sr-only">Open Menu</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            className={`absolute top-16 left-0 w-full bg-opacity-95 ${
              isDarkMode ? "bg-black text-white" : "bg-white text-black"
            } px-4 pb-4 flex flex-col gap-4 text-center shadow-md`}
          >
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="block py-2 text-lg hover:text-custom-green transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col space-y-2 mt-4 items-center">
              {darkButton({ isDarkMode, toggleDarkMode })}
              <Button
                onClick={() => handleNavigation("/login")}
                className="border-2 border-custom-green text-buttons-primary py-2 px-4 rounded-md hover:text-custom-green transition-all w-full"
              >
                Login
              </Button>
              <Button
                onClick={() => handleNavigation("/register")}
                className="w-full"
              >
                Sign Up
              </Button>
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className=" sm:mt-20 lg:mt-0 px-4">
        <HeroComponent isDarkMode={isDarkMode} />
        <ImageSection isDarkMode={isDarkMode} />
        <FeatureSection isDarkMode={isDarkMode} />
        <RankingSection isDarkMode={isDarkMode} />
        <GitHubSection isDarkMode={isDarkMode} />
      </main>

      {/* Footer Section */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default LandingPage;
