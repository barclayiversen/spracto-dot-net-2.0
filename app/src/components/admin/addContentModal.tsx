//components/admin/addContentModal.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const AddContentModal = ({ isModalOpen, toggleModal, kind }) => {
  const [contentType, setContentType] = useState(kind); // Default to 'track'
  const [trackId, setTrackId] = useState("");
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null); // New state for the file

  useEffect(() => {
    setContentType(kind); // Update the content type when 'kind' changes
  }, [kind]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contentType.toLowerCase() === "image" && file) {
      const formData = new FormData();
      formData.append("file", file); // Append the file to form data
      formData.append("kind", contentType.toLowerCase());
      // Add other fields if necessary
      try {
        const response = await axios.post(
          // `/api/datastore/${contentType}/add`,
          `/api/datastore/upload`,

          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    } else {
      // Handle other content types as before
      const data = {
        kind: contentType.toLowerCase(),
        trackId,
        platform,
        dlUrl: url,
      };
      const response = await axios.post(
        `/api/datastore/${contentType}/add`,
        data
      );
      console.log(response.data);
    }

    toggleModal(); // Close the modal after submission
  };

  if (!isModalOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center animate-fade-in-.5">
      <div className="bg-white p-5 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <div className="mb-4">
          <button
            onClick={toggleModal}
            className="absolute top-0 left-0 m-2 text-gray-600 hover:text-gray-900"
            aria-label="Close"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h2 className="text-lg font-bold">Add New Content</h2>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label
              htmlFor="content-type"
              className="block text-sm font-medium text-gray-700"
            >
              Content Type
            </label>
            <select
              id="content-type"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select an option</option>
              <option value="track">Track</option>
              <option value="image">Image</option>
            </select>
          </div>
          {contentType === "track" ? (
            <div>
              {/* Track inputs */}
              <input
                type="text"
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                placeholder="ID"
                className="mt-1 block w-full rounded-md border-gray-300"
              />
              <input
                type="text"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                placeholder="Platform"
                className="mt-1 block w-full rounded-md border-gray-300"
              />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="URL"
                className="mt-1 block w-full rounded-md border-gray-300"
              />
            </div>
          ) : (
            // Image upload input
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Image
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="mt-1 block w-full rounded-md border-gray-300"
              />
            </div>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Add Content
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContentModal;
