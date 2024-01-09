import React, { useState } from "react";
import ImageUploader from "@/components/admin/imageUploader";
import Thumbnails from "@/components/admin/thumbnails";
import ImageRemover from "./imageRemover";

const RenderImages = ({ data }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", file);

    try {
      // POST request to your server endpoint for file upload
      const response = await fetch("/api/datastore/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log("result", result); // The response from your server
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleRemove = async (imageUrl) => {
    if (window.confirm("Are you sure you want to remove this image?")) {
      // Call the remove API endpoint
      try {
        const response = await fetch("/api/datastore/remove", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl }),
        });
        const result = await response.json();
        console.log("result", result); // The response from your server

        // Optionally update the state to reflect the removal
        setSelectedImage(null);
      } catch (error) {
        console.error("Removal failed:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-vh bg-red-200">
      <div className="flex-grow overflow-hidden bg-green-800">
        {selectedImage && (
          <>
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-full object-contain w-full h-full"
              style={{ maxHeight: "calc(80vh - 100px)" }}
            />
            <ImageRemover onRemove={() => handleRemove(selectedImage)} />
          </>
        )}
        <ImageUploader onFileChange={handleFileChange} />
      </div>
      <Thumbnails data={data} onSelectImage={setSelectedImage} />
    </div>
  );
};

export default RenderImages;
