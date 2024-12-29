import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { darkButton } from "../components/darkButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import lightMode from "../utils/images/logo_light_mode.svg";
import darkMode from "../utils/images/logo_dark_mode.svg";
import ParticlesComponent from "../components/particles";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));
    if (profileImage) form.append("profileImage", profileImage);

    try {
      await api.post("/users/register", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogoClick = () => {
    window.open("/", "_blank");
  };

  return (
    <div>
      <ParticlesComponent isDarkMode={isDarkMode} />
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-10 py-8 bg-transparent">
        {/* Dark Mode Toggle */}
        <div className="absolute top-4 right-4">
          {darkButton({ isDarkMode, toggleDarkMode })}
        </div>

        <div
          className={`w-full max-w-md p-8 rounded-lg shadow-lg mt-4 ${
            isDarkMode ? "bg-gray-800 text-white opacity-100" : "bg-white text-black opacity-100"
          }`}
        >
          <div onClick={handleLogoClick} className="flex justify-center">
            <img
              src={isDarkMode ? darkMode : lightMode}
              alt="LinkIt Logo"
              className="w-60 mx-auto"
            />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
              className={`w-full px-4 py-2 rounded border ${
                isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className={`w-full px-4 py-2 rounded border ${
                isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className={`w-full px-4 py-2 rounded border ${
                  isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="flex items-center gap-4">
              <label className="block text-sm font-medium">Profile Image:</label>
              <input
                type="file"
                onChange={(e) => setProfileImage(e.target.files[0])}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
              />
            </div>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-green-500 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
