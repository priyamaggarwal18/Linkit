import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { darkButton } from "../components/darkButton";
import LinkItLogo from "../components/linkitLogo";
import ParticlesComponent from "../components/particles";
import defaultProfileImage from "../utils/images/default.svg";

const Rankings = () => {
  const [rankings, setRankings] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Fetch rankings on component mount
    const fetchRankings = async () => {
      try {
        const { data } = await api.get("/users/popular-profiles");
        setRankings(data);
      } catch (err) {
        console.error("Error fetching rankings:", err);
      }
    };
    fetchRankings();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen">
      {/* Particles Background */}
      <ParticlesComponent isDarkMode={isDarkMode} />

      {/* Main Content */}
      <div
        className={`relative z-10 px-4 sm:px-10 py-8 bg-transparent ${
          isDarkMode ? "text-white" : " text-black"
        }`}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-center mb-6 ${
            isDarkMode ? "bg-custom-grey-color text-white" : "bg-white"
          } rounded-lg px-4`}
        >
          <LinkItLogo isDarkMode={isDarkMode} />
          <h2 className="lg:text-2xl font-bold sm:text-sm">Top Profiles</h2>
          {darkButton({ isDarkMode, toggleDarkMode })}
        </div>

        {/* Rankings Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {rankings.map((profile, index) => (
            <Link
              key={profile.id}
              to={`/profile/${profile.username}`}
              className={`block transition-transform duration-500 hover:scale-105 ${
                isDarkMode
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-white hover:bg-gray-200"
              } shadow-lg rounded-lg overflow-hidden mx-auto w-full max-w-[200px] md:max-w-[220px] h-[250px]`}
            >
              <div
                className="relative w-full h-full hover:scale-110 transition-transform duration-500"
                style={{
                  transformOrigin: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={profile.profileImage || defaultProfileImage}
                  alt={profile.username}
                  className="w-full h-3/5 object-cover transition-transform duration-500"
                />
                {index === 0 && (
                  <div
                    className="absolute top-2 right-2 bg-yellow-400 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                  >
                    🥇
                  </div>
                )}
                <div className="p-4 text-center h-2/5">
                  <h3
                    className={`text-lg font-bold ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {profile.username}
                  </h3>
                  <p className="text-md text-gray-500 dark:text-gray-400">
                    {profile.profileClicks} views
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rankings;
