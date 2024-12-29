import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export function darkButton({ isDarkMode, toggleDarkMode }) {
  return (
    <>
      <button
        onClick={toggleDarkMode}
        className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isDarkMode ? "bg-custom-green" : "bg-custom-green"
        } text-white transition duration-300 hover:bg-custom-grey-color`}
      >
        {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
      </button>
    </>
  );
}
