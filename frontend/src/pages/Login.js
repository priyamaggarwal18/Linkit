import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { darkButton } from "../components/darkButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import lightMode from "../utils/images/logo_light_mode.svg";
import darkMode from "../utils/images/logo_dark_mode.svg";
import ParticlesComponent from "../components/particles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/users/login", { email, password });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Incorrect email or password. Please try again.");
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
      <div
        className="relative min-h-screen flex flex-col items-center justify-center z-10 px-4 sm:px-10 py-8 bg-transparent"
      >
        <div className="absolute top-4 right-4">
          {darkButton({ isDarkMode, toggleDarkMode })}
        </div>

        <div
          className={`w-full max-w-md p-8 rounded-lg shadow-lg mt-4 ${
            isDarkMode ? "bg-custom-grey-color text-white" : "bg-white text-black"
          }`}
        >
          <div onClick={handleLogoClick} className="flex justify-center">
            <img
              src={isDarkMode ? darkMode : lightMode}
              alt="LinkIt Logo"
              className="w-60 mx-auto"
            />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-4 py-2 rounded border ${
                isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-green-500 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
