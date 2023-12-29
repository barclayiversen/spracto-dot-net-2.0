import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-black p-10 md:flex md:justify-center md:items-center text-center mt-20">
      <div className="flex-1 pl-4 mt-4 md:mt-0 md:order-2">
        <p>© {currentYear} Spracto</p>
      </div>
      <div className="flex-1 md:border-r md:border-gray-400 pr-4 md:order-1">
        <p>
          Wanna know about upcoming shows? Connect with Spracto on Instagram{" "}
          <a
            href="https://www.instagram.com/spracto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-300"
          >
            @spracto
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
