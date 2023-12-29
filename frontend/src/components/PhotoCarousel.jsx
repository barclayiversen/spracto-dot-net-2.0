import React, { useState, useEffect } from "react";

const PhotoCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3100); // Change image every 3 seconds

    return () => clearTimeout(timer);
  }, [currentImageIndex, images.length]);

  const goToPrevious = () => {
    const newIndex =
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
  };

  return (
    <div className="container bg-black mx-auto px-5">
      <p className="font-bold text-white text-4xl">Gallery</p>
      <div className="relative w-full max-h-full max-w-screen-lg mx-auto overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt={`Slide ${currentImageIndex}`}
          className="w-full object-cover"
        />

        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2"
        >
          Prev
        </button>

        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PhotoCarousel;
