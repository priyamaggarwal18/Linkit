import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { darkButton } from "../components/darkButton";
import ParticlesComponent from "../components/particles";
import LinkItLogo from "../components/linkitLogo";
import { CopyButton } from "../components/copyLink";
import defaultProfileImage from "../utils/images/default.svg";
import AOS from "aos";
import "aos/dist/aos.css";

const PublicProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get(`/users/profile/${username}`);
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();

    AOS.init({
      duration: 500,
      easing: "ease-in-out",
      once: false,
    });
  }, [username]);

  useEffect(() => {
    AOS.refresh();
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center ${
        isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Particles Background */}
      <ParticlesComponent isDarkMode={isDarkMode} />

      {/* Header Section */}
      <header
        className="w-full flex justify-between px-10 py-4 z-10"
        data-aos="fade-down"
      >
        <LinkItLogo isDarkMode={isDarkMode} />
        <div className="flex gap-4 items-center">
          {darkButton({ isDarkMode, toggleDarkMode })}
          <CopyButton link={`localhost:3000/profile/${username}`} />
        </div>
      </header>

      {/* Profile Card Section */}
      <div
        className="w-full max-w-md z-10 bg-custom-grey-color bg-opacity-10 backdrop-blur-sm rounded-lg p-10"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        {/* Profile Section */}
        <div className="text-center mb-8 z-10" data-aos="fade-up">
            <div
              className={`w-40 h-40 rounded-lg overflow-hidden mx-auto mb-4 border-4 ${
                isDarkMode
                  ? "bg-black text-white border-custom-green"
                  : "bg-gray-100 text-black border-custom-grey-color"
              }`}
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <img
                src={profile.profileImage || defaultProfileImage}
                alt={`${profile.username}'s profile`}
                className="w-full h-full object-cover"
              />
            </div>
          <h1
            className="text-3xl font-bold"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <span className="text-custom-green">@</span>
            {profile.username}
          </h1>
        </div>

        {/* Links Section */}
        <div className="w-full max-w-md z-10 rounded-lg p-4" data-aos="fade-up">
          {profile.links &&
            profile.links.map((link, index) => (
              <div
                key={link._id}
                onClick={() =>
                  window.open(link.link, "_blank", "noopener,noreferrer")
                }
                className="block bg-custom-green text-white hover:bg-custom-grey-color text-center text-lg font-medium py-4 mb-4 rounded-lg transition cursor-pointer"
              >
                {link.title}
              </div>
            ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer
        className="mt-12 text-sm z-10"
      >
        <p>&copy; {new Date().getFullYear()} Created with Linkit</p>
      </footer>
    </div>
  );
};

export default PublicProfile;
