import Link from "next/link";
import {
  FaInstagram,
  FaSoundcloud,
  FaYoutube,
  FaSpotify,
} from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-transparent ">
      <div className="flex items-center">
        <Link href="/">
          <img src="/logo.png" alt="My Logo" className="h-12 w-auto" />
        </Link>
      </div>
      <div className="flex space-x-4">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-4xl"
        >
          <FaInstagram />
        </a>
        <a
          href="https://soundcloud.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-4xl"
        >
          <FaSoundcloud />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-4xl"
        >
          <FaYoutube />
        </a>
        <a
          href="https://spotify.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-4xl"
        >
          <FaSpotify />
        </a>
      </div>
    </header>
  );
};

export default Header;
