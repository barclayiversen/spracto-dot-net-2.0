//components/home/header.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faSoundcloud,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Modal from "./modal";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed z-10 top-0 w-full p-4 transition-colors duration-500 ${
        isScrolled ? "bg-black" : "bg-transparent"
      } text-white`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} size="3x" />
        </Link>

        <nav className="hidden md:flex space-x-4">
          <Link href="https://instagram.com/_legrant">
            <FontAwesomeIcon size="3x" icon={faInstagram} />
          </Link>
          <Link href="https://soundcloud.com/austenluego">
            <FontAwesomeIcon size="3x" icon={faSoundcloud} />
          </Link>
        </nav>

        <button
          className="md:hidden"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
          </svg>
        </button>

        {isModalOpen && (
          <Modal
            close={() => setIsModalOpen(false)}
            className="animate-fade-in-.2"
          >
            <nav className="flex flex-col items-center space-y-4">
              <a
                href="https://instagram.com/_legrant"
                className="text-white text-2xl px-3 py-2"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsModalOpen(false)}
              >
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>

              <a
                href="https://soundcloud.com/austenluego"
                className="text-white text-2xl px-3 py-2"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsModalOpen(false)}
              >
                <FontAwesomeIcon icon={faSoundcloud} size="2x" />
              </a>

              {/* <a
                href="https://youtube.com/_legrant"
                className="text-white text-2xl px-3 py-2"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsModalOpen(false)}
              >
                <FontAwesomeIcon icon={faYoutube} size="2x" />
              </a> */}
            </nav>
          </Modal>
        )}
      </div>
    </header>
  );
};

export default Header;
