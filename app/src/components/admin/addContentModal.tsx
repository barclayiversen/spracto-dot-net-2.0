//components/admin/addContentModal.tsx
import React, { useState, useEffect, ChangeEvent } from "react";
import Loading from "@/components/admin/loading";

import axios from "axios";

interface AddContentModalProps {
  isModalOpen: boolean;
  toggleModal: () => void;
  kind: string;
  triggerDataRefresh: (kind: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
}

const AddContentModal: React.FC<AddContentModalProps> = ({
  isModalOpen,
  toggleModal,
  kind,
  triggerDataRefresh,
  setIsLoading,
  isLoading,
}) => {
  const [contentType, setContentType] = useState(kind); // Default to 'track'
  const [trackId, setTrackId] = useState("");
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null); // New state for the file
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({
    trackId: "",
    platform: "",
    url: "",
    file: "",
  });

  useEffect(() => {
    setContentType(kind); // Update the content type when 'kind' changes
  }, [kind]);

  const validateForm = () => {
    let newErrors = { trackId: "", platform: "", url: "", file: "" };
    let isValid = true;

    if (kind === "image") {
      if (file) {
        return isValid;
      } else {
        newErrors.file = "Please select a file to upload.";
      }
    }

    if (!trackId) {
      newErrors.trackId = "Please enter a track ID.";
      isValid = false;
    }
    if (!platform) {
      newErrors.platform = "Please enter a platform.";
      isValid = false;
    }
    if (!url) {
      newErrors.url = "Please enter a URL.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    console.log("contentType", contentType);

    setErrors({ trackId: "", platform: "", url: "", file: "" });

    if (!validateForm()) {
      setIsLoading(false);
      return; // Stop form submission if validation fails
    }

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
        console.log("added IMAGE", response.data);
        triggerDataRefresh("image");
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    } else if (contentType.toLowerCase() === "track") {
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
      triggerDataRefresh("track");

      console.log(response.data);
    }
    setIsLoading(false);
    toggleModal(); // Close the modal after submission
  };

  if (!isModalOpen) return null; // Don't render the modal if it's not open

  if (isLoading) {
    return <Loading />;
  }
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
          {errorMessage && (
            <div className="font-bold text-red-400">{errorMessage}</div>
          )}
          {contentType === "track" ? (
            <div>
              <input
                type="text"
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                placeholder="ID"
                className="mt-1 block w-full rounded-md border-gray-300"
              />
              {errors.trackId && (
                <p className="text-red-500 text-xs italic">{errors.trackId}</p>
              )}

              <input
                type="text"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                placeholder="Platform"
                className="mt-1 block w-full rounded-md border-gray-300"
              />
              {errors.platform && (
                <p className="text-red-500 text-xs italic">{errors.platform}</p>
              )}

              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Download URL"
                className="mt-1 block w-full rounded-md border-gray-300"
              />
              {errors.url && (
                <p className="text-red-500 text-xs italic">{errors.url}</p>
              )}
            </div>
          ) : (
            // Image upload input
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Image
              </label>
              <input
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  // Check if files exist and if there's at least one file
                  const selectedFile = e.target.files
                    ? e.target.files[0]
                    : null;
                  setFile(selectedFile);
                }}
                className="mt-2 block w-full border-gray-200"
              />

              <p className="text-red-500 text-xs italic">{errors.file}</p>
            </div>
          )}
          <button
            type="submit"
            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Add Content
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContentModal;
