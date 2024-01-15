import React, { useState } from "react";
import RenderImages from "@/components/admin/images/renderImages";

const ImageManager = ({ data }) => {
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
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="flex flex-col bg-red-400">
      <RenderImages
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        handleFileChange={handleFileChange}
        data={data}
      />
    </div>
  );
};

export default ImageManager;
