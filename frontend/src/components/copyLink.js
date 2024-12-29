import React from "react";
import { FaCopy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function CopyButton({ link }) {
  const navigate = useNavigate();

  const handleCopyAndNavigate = () => {
    navigator.clipboard.writeText(link)
      .then(() => {
        alert("Link copied to clipboard!");
        navigate(link);
      })
      .catch((err) => console.error("Failed to copy the link:", err));
  };

  return (
    <button
      onClick={handleCopyAndNavigate}
      className="w-12 h-12 rounded-full flex items-center justify-center bg-custom-green text-white transition duration-300 hover:bg-green-600"
    >
      <FaCopy size={24} />
    </button>
  );
}
