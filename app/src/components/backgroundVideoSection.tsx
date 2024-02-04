import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll";
import React from "react";

const BackgroundVideoSection: React.FC = () => {
  const offsetValue = -100; // Adjust this value as needed

  return (
    <div className="relative w-full h-screen animate-fade-in-.5">
      <video
        playsInline
        src="/bgvideo.mp4"
        autoPlay
        preload="auto"
        poster="/poster.png"
        loop
        muted
        className="absolute top-0 left-0 w-full h-screen object-cover brightness-75"
      />

      <div className="absolute top-0 left-0 z-1 w-full h-screen flex justify-center items-center">
        <div className="relative md:w-1/2 w-3/4 h-1/2 md:border-gray-400">
          <Image
            src="/logo-black.png"
            alt="Logo"
            layout="fill"
            objectFit="contain"
            className="animate-fade-in-2"
          />
        </div>
      </div>

      <Link
        to="content"
        spy={true}
        smooth={true}
        duration={500}
        offset={offsetValue}
        className="cursor-pointer"
      >
        <div className="bg-black max-h-7">
          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-white absolute left-1/2 bottom-20 animate-bounce"
            size="3x"
          />
        </div>
      </Link>
    </div>
  );
};

export default BackgroundVideoSection;
