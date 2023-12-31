import React, { useState, useEffect } from "react";
import axios from "axios";

const PhotoCarousel: React.FC = () => {
  const [images, setImages] = useState<string[]>([]); // Holds an array of image URLs
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/images");
        setImages(response.data);
        setIsLoading(false);
      } catch (error: any) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const minSwipeDistance = 50;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

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

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX); // Should this be setTouchStart?
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > minSwipeDistance) {
      goToNext();
    }

    if (touchEnd - touchStart > minSwipeDistance) {
      goToPrevious();
    }
  };

  return (
    <div className="bg-black mx-auto py-20 text-center">
      <p className="font-bold text-white text-4xl pb-4 ">Gallery</p>
      <div
        className="relative w-full max-h-full max-w-screen-lg mx-auto overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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
