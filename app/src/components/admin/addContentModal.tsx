import React, { useState } from "react";

const AddContentModal = ({ isModalOpen, toggleModal }) => {
  const [contentType, setContentType] = useState("track"); // Default to 'track'

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the logic to add the content
    console.log("Adding content of type:", contentType);
    toggleModal(); // Close the modal after submission
  };

  if (!isModalOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg relative ">
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
              <option value="track">Track</option>
              <option value="image">Image</option>
            </select>
          </div>
          {/* Add additional form inputs here based on the content type */}
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
