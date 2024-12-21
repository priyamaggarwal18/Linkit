import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/button";
import { darkButton } from "../components/darkButton";
import { useNavigate } from "react-router-dom";
import lightMode from "../utils/images/logo_light_mode.svg";
import darkMode from "../utils/images/logo_dark_mode.svg";
import { Footer } from "./Footer";
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

  return (
    <div className={isDarkMode ? "bg-black text-white" : "bg-white text-black"}>
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        } backdrop-blur-md`}
      >
        <div className="max-w-7xl mx-auto px-2 items-center justify-between sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src={isDarkMode ? darkMode : lightMode}
                alt="logo"
                className="w-40" // Adjust the scale value as needed
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-6 md:gap-10">
              {["Home", "Features", "Review", "Team", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-custom-green transition-colors"
                >
                  {item}
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
              <Button>Sign Up</Button>
              <Button
                className={`transition-all duration-300 ${
                  isDarkMode
                    ? "bg-custom-green hover:bg-custom-green text-white"
                    : "bg-custom-green hover:bg-custom-green text-white"
                } py-2 px-4 rounded-md`}
              >
                Start Free Trial
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
            <nav className="lg:hidden px-4 pb-4">
              <ul className="space-y-2">
                {["Home", "Features", "Review", "Team", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className="block py-2 text-lg hover:text-custom-green transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
              <div className="flex flex-col space-y-2 mt-4">
                {darkButton({ isDarkMode, toggleDarkMode })}
                <Button className="border-2 border-custom-green text-buttons-primary py-2 rounded-md hover:text-custom-green transition-all">
                  Sign Up
                </Button>
                <Button
                  className={`transition-all duration-300 ${
                    isDarkMode
                      ? "bg-custom-green hover:bg-custom-green text-white"
                      : "bg-custom-green hover:bg-custom-green text-white"
                  } py-2`}
                >
                  Start Free Trial
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default LandingPage;
