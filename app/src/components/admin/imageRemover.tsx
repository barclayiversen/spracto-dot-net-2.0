import React from "react";

const ImageRemover = ({ onRemove, imageUrl }) => {
  return (
    <button
      className="w-24 h-24 mr-2 flex justify-center items-center bg-red-200 cursor-pointer object-cover"
      onClick={() => onRemove(imageUrl)}
    >
      <span className="text-4xl text-gray-600">-</span> {/* Minus symbol */}
    </button>
  );
};

export default ImageRemover;
