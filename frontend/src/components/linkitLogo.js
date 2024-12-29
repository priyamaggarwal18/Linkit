import React from "react";
import lightMode from "../utils/images/logo_light_mode.svg";
import darkMode from "../utils/images/logo_dark_mode.svg";

const LinkItLogo = ({ isDarkMode }) => {
  const handleLogoClick = () => {
    window.open("/", "_blank");
  };

  return (
    <div
      onClick={handleLogoClick}
      className="cursor-pointer flex items-center"
    >
      <img
        src={isDarkMode ? darkMode : lightMode}
        alt="LinkIt Logo"
        className="w-32 sm:w-40"
      />
    </div>
  );
};

export default LinkItLogo;
