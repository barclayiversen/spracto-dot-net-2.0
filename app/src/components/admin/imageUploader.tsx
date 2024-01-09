import React, { useRef } from "react";

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

export default ImageUploader;
