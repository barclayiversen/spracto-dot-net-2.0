import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSoundcloud, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Releases: React.FC = () => {
  const soundcloudUrl = "https://soundcloud.com/spracto"; // Your SoundCloud profile URL
  const youtubeUrl = "https://youtube.com/spracto";

  return (
    <div className="bg-black mx-auto p-5 text-center">
      <h2 className="text-2xl font-bold mb-4 text-white">Stream my tracks:</h2>
      <div className="mt-2 flex flex-col items-center sm:flex-row justify-center sm:space-x-4 space-y-10 sm:space-y-0">
        <a href={soundcloudUrl} target="_blank" rel="noopener noreferrer">
          <button className="bg-white text-black py-2 px-6 w-60 font-mono hover:bg-gray-200 rounded-3xl flex items-center justify-center">
            <FontAwesomeIcon icon={faSoundcloud} className="mr-2" size="3x" />
            on SoundCloud
          </button>
        </a>
        <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
          <button className="bg-white text-black py-2 px-6 w-60 font-mono hover:bg-gray-200 rounded-3xl flex items-center justify-center">
            <FontAwesomeIcon icon={faYoutube} className="mr-2" size="3x" />
            on YouTube
          </button>
        </a>
      </div>
    </div>
  );
};

export default Releases;
