import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { darkButton } from "../components/darkButton";
import LinkItLogo from "../components/linkitLogo";
import ParticlesComponent from "../components/particles";
import defaultProfile from "../utils/images/default.svg";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ title: "", link: "" });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editingLink, setEditingLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileClicks, setProfileClicks] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await api.get("/users/me");
        setUser(data);
        setLinks(data.links || []);
        setProfileClicks(data.profileClicks || 0);
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handlePublicProfile = () => {
    if (user && user.username) {
      const publicProfileUrl = `linkit-97du.vercel.app/profile/${user.username}`;
      window.location.href = publicProfileUrl;
    } else {
      console.error("User or username is undefined.");
    }
  };

  const handleImageUpload = async () => {
    if (!profileImage) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("profileImage", profileImage);

    try {
      const { data } = await api.put("/users/update-profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser((prevUser) => ({ ...prevUser, profileImage: data.profileImage }));
      setPreviewImage(null);
      setProfileImage(null);
    } catch (error) {
      console.error("Error updating profile image:", error);
    } finally {
      setLoading(false);
    }
  };

  const addLink = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/links", newLink);
      setLinks((prevLinks) => [...prevLinks, data]);
      setNewLink({ title: "", link: "" });
    } catch (error) {
      console.error("Error creating link:", error);
    }
  };

  const deleteLink = async (id) => {
    try {
      await api.delete(`/links/${id}`);
      setLinks((prevLinks) => prevLinks.filter((link) => link._id !== id));
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  const updateLink = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(`/links/${editingLink._id}`, editingLink);
      setLinks((prevLinks) =>
        prevLinks.map((link) => (link._id === editingLink._id ? data : link))
      );
      setEditingLink(null);
    } catch (error) {
      console.error("Error updating link:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="relative min-h-screen">
      {/* Particles Background */}
      <ParticlesComponent isDarkMode={isDarkMode} />

      {/* Main Content */}
      <div
        className={`relative z-10 flex flex-col items-center px-4 sm:px-10 py-4 sm:py-8 bg-transparent ${
          isDarkMode ?  "text-white" : " text-black"
        }`}
      >
        {/* Header Section */}
        <div className="w-full flex flex-col sm:flex-row sm:justify-between items-center px-4 sm:px-10 py-4">
          <LinkItLogo isDarkMode={isDarkMode} />
          <div className="flex flex-wrap items-center gap-4">
            {darkButton({ isDarkMode, toggleDarkMode })}
            <button
              onClick={handlePublicProfile}
              className="px-4 py-2 border border-green-500 text-green-500 rounded hover:bg-custom-green hover:text-white"
            >
              Public Profile
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
        <div
          className={`w-full max-w-5xl  flex flex-col  items-center p-10 rounded-lg shadow-lg mt-4 ${
            isDarkMode
    ? "bg-custom-grey-color text-white bg-opacity-50 backdrop-blur-md"
    : "bg-white text-black bg-opacity-50 backdrop-blur-md"
          }`}
        >
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          Welcome 👋, {user.username}!
        </h1>

        {/* Profile Section */}
        <div className="mb-8 flex flex-wrap justify-between items-start w-full max-w-4xl gap-4">
          {/* Profile Image */}
          <div className="w-full sm:w-auto text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Your Profile</h2>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                src={previewImage || user.profileImage || defaultProfile}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="text-center sm:text-left">
                <label className="block px-4 py-2 border border-green-500 text-green-500 rounded cursor-pointer hover:bg-custom-green hover:text-white">
                  Choose File
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {profileImage && (
                  <button
                    onClick={handleImageUpload}
                    disabled={loading}
                    className={`mt-2 px-4 py-2 ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    } rounded`}
                  >
                    {loading ? "Updating..." : "Update Image"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Clicks */}
          <div className="w-full sm:w-auto p-4 rounded shadow text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Profile Clicks</h3>
            <p className="text-3xl sm:text-4xl font-bold text-green-500">{profileClicks}</p>
          </div>
        </div>

        {/* Links Section */}
        <div className="w-full max-w-4xl">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">Your Links</h2>

          {/* Add/Update Link Form */}
          <form
            onSubmit={editingLink ? updateLink : addLink}
            className="mb-6 flex flex-col sm:flex-row gap-4"
          >
            <input
              type="text"
              placeholder="Title"
              value={editingLink ? editingLink.title : newLink.title}
              onChange={(e) =>
                editingLink
                  ? setEditingLink({ ...editingLink, title: e.target.value })
                  : setNewLink({ ...newLink, title: e.target.value })
              }
              className="flex-1 px-4 py-2 border rounded text-black"
              required
            />
            <input
              type="url"
              placeholder="Link"
              value={editingLink ? editingLink.link : newLink.link}
              onChange={(e) =>
                editingLink
                  ? setEditingLink({ ...editingLink, link: e.target.value })
                  : setNewLink({ ...newLink, link: e.target.value })
              }
              className="flex-1 px-4 py-2 border rounded text-black"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-custom-green text-white rounded hover:bg-green-600"
            >
              {editingLink ? "Update Link" : "Add Link"}
            </button>
            {editingLink && (
              <button
                type="button"
                onClick={() => setEditingLink(null)}
                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </form>

          {/* Display Links */}
          <ul className="flex flex-col gap-4 p-4 border border-custom-green rounded sm:p-8 overflow-y-auto max-h-[400px]">
            {links.map((link) => (
              <li
                key={link._id}
                className={`flex flex-col sm:flex-row justify-between items-center p-4 rounded shadow ${
                  isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100"
                }`}
              >
                <div className="w-full text-center sm:text-left">
                  <strong>{link.title}</strong>:{" "}
                  <a
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {link.link}
                  </a>
                </div>
                <div className="flex gap-2 mt-4 sm:mt-0">
                  <button
                    onClick={() => setEditingLink(link)}
                    className="px-4 py-2 bg-custom-green text-white rounded hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteLink(link._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
