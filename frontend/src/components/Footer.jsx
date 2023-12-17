import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white text-center p-4">
      <p>© {currentYear} Spracto</p>
    </footer>
  );
}

export default Footer;
