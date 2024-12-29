import React from "react";
import { FaCopy } from "react-icons/fa";

export function CopyButton({ link }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(link)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => console.error("Failed to copy the link:", err));
  };

  return (
    <button
      onClick={handleCopy}
      className="w-12 h-12 rounded-full flex items-center justify-center bg-custom-green text-white transition duration-300 hover:bg-green-600"
    >
      <FaCopy size={24} />
    </button>
  );
}
