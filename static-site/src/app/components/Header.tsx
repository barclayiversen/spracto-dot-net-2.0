"use client";

import Link from "next/link";
import {
  FaInstagram,
  FaSoundcloud,
  FaYoutube,
  FaSpotify,
} from "react-icons/fa";
import { IconType } from "react-icons";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const socialLinks: { href: string; icon: IconType }[] = [
    { href: "https://instagram.com", icon: FaInstagram },
    { href: "https://soundcloud.com", icon: FaSoundcloud },
    { href: "https://youtube.com", icon: FaYoutube },
    { href: "https://spotify.com", icon: FaSpotify },
  ];

  const openModal = () => {
    setIsAnimating(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsAnimating(true);
    setIsModalOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-10 flex justify-between items-center p-4 transition-colors duration-300 ${
          isScrolled ? "bg-black" : "bg-transparent"
        }`}
      >
        <div className="flex items-center">
          <Link href="/">
            <img src="/logo.png" alt="My Logo" className="h-12 w-auto" />
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          {socialLinks.map(({ href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-4xl transition-transform duration-300 transform hover:scale-125"
            >
              <Icon />
            </a>
          ))}
        </div>
        <div className="md:hidden">
          <button
            onClick={openModal}
            className="text-white text-4xl transition-transform duration-300 transform hover:scale-125"
          >
            <FaBars />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-black flex flex-col items-center justify-center z-20 transition-all duration-300 ${
          isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onAnimationEnd={() => setIsAnimating(false)}
      >
        <div className="absolute top-4 left-4">
          <Link href="/">
            <img src="/logo.png" alt="My Logo" className="h-12 w-auto" />
          </Link>
        </div>
        <button
          onClick={closeModal}
          className="text-white text-4xl absolute top-4 right-4 transition-transform duration-300 transform hover:scale-125"
        >
          <FaTimes />
        </button>
        <div className="flex flex-col space-y-4 mt-20">
          {socialLinks.map(({ href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-6xl transition-transform duration-300 transform hover:scale-125"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
