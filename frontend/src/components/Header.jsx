import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faSoundcloud,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Modal from "./Modal";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <Router>
          <Link to="/">
            <img src={logo} alt="Logo" className="h-10 w-40 mr-2" />
          </Link>
        </Router>
        <Router>
          <nav className="hidden md:flex">
            <Link
              to="https://instagram.com/spracto"
              className="text-white px-3 py-2 rounded-md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon size="3x" icon={faInstagram} />
            </Link>
            <Link
              to="https://soundcloud.com/spracto"
              className="text-white px-3 py-2 rounded-md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon size="3x" icon={faSoundcloud} />
            </Link>
            <Link
              to="https://youtube.com/spracto"
              className="text-white px-3 py-2 rounded-md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon size="3x" icon={faYoutube} />
            </Link>
          </nav>
          <button className="md:hidden" onClick={() => setIsModalOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
            </svg>
          </button>
        </Router>

        {isModalOpen && (
          <Modal
            close={() => setIsModalOpen(false)}
            className="animate-fade animate-duration-[500ms]"
          >
            <Router>
              <nav className="flex flex-col items-center">
                <Link
                  to="https://instagram.com/spracto"
                  className="text-white text-2xl px-3 py-2 mb-4"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsModalOpen(false)}
                >
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </Link>

                <Link
                  to="https://soundcloud.com/spracto"
                  className="text-white text-2xl px-3 py-2 mb-4"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsModalOpen(false)}
                >
                  <FontAwesomeIcon icon={faSoundcloud} size="2x" />
                </Link>
                <Link
                  to="https://youtube.com/spracto"
                  className="text-white text-2xl px-3 py-2 mb-4"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsModalOpen(false)}
                >
                  <FontAwesomeIcon icon={faYoutube} size="2x" />
                </Link>
              </nav>
            </Router>
          </Modal>
        )}
      </div>
    </header>
  );
}

export default Header;
