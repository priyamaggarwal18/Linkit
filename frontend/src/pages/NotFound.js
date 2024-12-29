import React, { useState } from 'react';
import notfoundlight from "../utils/images/404_light.svg";
import notfounddark from "../utils/images/404_dark.svg";
import LinkItLogo from '../components/linkitLogo';

const NotFound = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen w-full px-5 transition-all ${
        darkMode ? 'bg-custom-grey-color text-white' : 'bg-white text-gray-900'
      }`}
    >
      {/* Logo */}
      <div className="mb-6">
        <LinkItLogo isDarkMode={darkMode} />
      </div>

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        404 - Page Not Found
      </h1>

      {/* Description */}
      <p className="text-md md:text-lg mb-6 text-center">
        The page you're looking for doesn't exist.
      </p>

      {/* Image */}
      <img
        src={darkMode ? notfoundlight : notfounddark}
        alt="Not Found"
        className="w-64 sm:w-72 md:w-96 h-auto mb-6 transition-all"
      />

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="/"
          className="px-4 py-2 rounded-lg font-semibold transition-all bg-custom-green text-white hover:bg-green-600 text-center"
        >
          Go Back Home
        </a>
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded-lg font-semibold transition-all text-center ${
            darkMode
              ? 'bg-custom-grey-color hover:bg-custom-green text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-white'
          }`}
        >
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>
    </div>
  );
};

export default NotFound;
