import React from "react";

const Show: React.FC<{
  src: string;
  alt: string;
  buttonText: string;
  onClick: () => void;
}> = ({ src, alt, buttonText, onClick }) => {
  return (
    <div className="text-center">
      <img src={src} alt={alt} className="mx-auto mb-4" />
      <button
        onClick={onClick}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Show;
