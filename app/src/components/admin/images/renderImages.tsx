import React, { useState, useRef } from "react";

const Thumbnails = ({ data, onSelectImage }) => {
  return (
    <div
      className="flex overflow-x-auto  mx-auto bg-blue-200"
      // style={{ height: "10vh" }}
    >
      {data.map((item: { url: string; id: string }, index: number) => (
        <img
          key={item.id}
          src={item.url}
          alt={`Thumbnail ${index}`}
          className="w-24 h-24 m-2 cursor-pointer object-cover"
          onClick={() => {
            onSelectImage(item);
          }}
        />
      ))}
    </div>
  );
};

const ImageRemover = ({ onRemove, item }) => {
  return (
    <button
      className="w-24 h-24 mr-2 flex justify-center items-center bg-red-200 cursor-pointer object-cover"
      onClick={() => onRemove(item)}
    >
      <span className="text-4xl text-gray-600">-</span> {/* Minus symbol */}
    </button>
  );
};

const ImageUploader = ({ onFileChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        type="file"
        onChange={onFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <div
        className="w-24 h-24 mr-2 flex justify-center items-center bg-gray-200 cursor-pointer object-cover"
        onClick={() => fileInputRef.current?.click()}
      >
        <span className="text-4xl text-gray-600">+</span>
      </div>
    </>
  );
};

const RenderImages = ({
  handleFileChange,
  selectedImage,
  setSelectedImage,
  data,
}) => {
  const [loading, setLoading] = useState(false);

  const handleRemove = async (data) => {
    if (window.confirm("Are you sure you want to remove this image?")) {
      // Call the remove API endpoint
      try {
        const response = await fetch("/api/datastore/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        });
        const result = await response.json();

        // Optionally update the state to reflect the removal
        setSelectedImage(null);
      } catch (error) {
        console.error("Removal failed:", error);
      }
    }
  };

  const handleUpload = async (event) => {
    // const [data, setData] = useState(false);

    const file = event.target.files[0];
    if (!file) return;

    setLoading(true); // Set loading state to true

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

      // Update the data state with the newly uploaded image URL
      const newImageUrl = result.imageUrl;
      const newImageData = [...data, { url: newImageUrl, id: result.imageId }];
      // Use the imageId returned from the server as the unique identifier

      setLoading(false); // Set loading state to false when upload is complete
    } catch (error) {
      console.error("Upload failed:", error);
      setLoading(false); // Set loading state to false on upload failure
    }
  };

  return (
    <>
      {selectedImage && (
        <>
          <img
            src={selectedImage.url}
            alt="Selected"
            className="mx-auto object-contain"
            // style={{ maxHeight: "calc(80vh - 100px)" }}
          />
          <div className="flex justify-center bg-black">
            {/* Wrap the components and center them */}
            <ImageRemover
              onRemove={() => handleRemove(selectedImage)}
              item={selectedImage}
            />
            {loading ? (
              <div className="w-24 h-24 mr-2 flex justify-center items-center bg-blue-100 cursor-not-allowed object-cover">
                <span className="text-4xl text-gray-600">Uploading...</span>
              </div>
            ) : (
              <ImageUploader
                onFileChange={handleUpload}
                disabled={loading} // Disable the file input while uploading
              />
            )}
          </div>
        </>
      )}

      <Thumbnails data={data} onSelectImage={setSelectedImage} />
    </>
  );
};

export default RenderImages;