import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
      >
        <source src="/bgvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-25"></div>
      <div className="relative flex items-center justify-center h-full">
        <img src="/logo-black.png" alt="My Logo" className="h-48 w-auto" />
      </div>
    </div>
  );
};

export default Hero;
