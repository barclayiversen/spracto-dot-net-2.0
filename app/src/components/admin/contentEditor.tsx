// components/contentEditor.tsx

import React, { useState } from "react";

const ContentEditor = ({ content, kind }) => {
  const [editedContent, setEditedContent] = useState(content);

  const handleChange = (e) => {
    setEditedContent({ ...editedContent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Logic to save the edited content
  };

  const handleMakeFeatured = () => {
    // Logic to make the track a featured release
  };

  const handleDelete = () => {
    // Logic to delete the track
  };

  if (!content) {
    return <div>Select an item to edit.</div>;
  }

  return (
    <div className="content-editor p-4 bg-gray-200">
      {kind === "track" && (
        <div className="flex">
          <div className="flex-1 p-4">
            {/* Left Column: Track Information and Buttons */}
            <button
              onClick={handleMakeFeatured}
              className="mr-2 px-4 py-2 bg-green-500 rounded hover:bg-green-700 transition duration-300"
            >
              Make Featured Release
            </button>
            <button
              onClick={handleDelete}
              className="mr-2 px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition duration-300"
            >
              Delete
            </button>
          </div>
          <div className="flex-1 p-4">
            {/* Right Column: Iframe */}
            <iframe
              // src={editedContent. || ""}
              className="w-full h-64"
            ></iframe>
          </div>
        </div>
      )}

      {kind === "image" &&
        {
          /* Image editing form elements */
        }}

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-red-500 rounded hover:bg-red-700 transition duration-300"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ContentEditor;
