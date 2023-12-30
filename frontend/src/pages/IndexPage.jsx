import React, { useEffect, useState } from "react";
import bgVideo from "../assets/newbgvideo.mp4";
import logo from "../assets/logo-black.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll";
import Releases from "../components/Releases";
import PhotoCarousel from "../components/PhotoCarousel";

const Index = () => {
  const [tracks, setTracks] = useState([]);
  const [images, setImages] = useState([]);

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetch(backendURL + "/tracks")
      .then((response) => response.json())
      .then((data) => {
        setTracks(data);
      })
      .catch((error) => console.error(error));
  }, [backendURL]);

  useEffect(() => {
    fetch(backendURL + "/images")
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
      })
      .catch((error) => console.error(error));
  }, [backendURL]);

  // Adjust this value as needed for your layout
  const offsetValue = -100; // Example: -100 pixels

  return (
    <>
      <div className="w-full h-screen">
        <video
          src={bgVideo}
          autoPlay
          loop
          muted
          className="w-full h-screen object-cover brightness-75"
        />
        <img
          src={logo}
          alt="Logo"
          className="absolute inset-0 m-auto w-auto h-40 z-0 animate-fade animate-duration-[3500ms]"
        />

        <Link
          to="content"
          smooth={true}
          duration={500}
          offset={offsetValue}
          className="cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{ color: "#ffffff" }}
            className="absolute left-1/2 bottom-20 animate-bounce"
          />
        </Link>
      </div>

      <div
        id="content"
        className="w-full h-auto bg-black text-white px-5 py-20 text-2xl font-sans text-center justify-center mt-10"
      >
        Rootin' Tootin' Troubleshootin'! Spracto is just a dude trying to be a
        guy, man! He makes music from his apartment in San Francisco.
      </div>
      <Releases tracks={tracks} />
      <PhotoCarousel images={images} />
    </>
  );
};

export default Index;
