import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSoundcloud, faSpotify } from "@fortawesome/free-brands-svg-icons";

const Releases: React.FC = () => {
  const soundcloudUrl = "https://soundcloud.com/spracto"; // Your SoundCloud profile URL

  return (
    <div className="bg-black mx-auto p-5 text-center">
      <h2 className="text-2xl font-bold mb-4 text-white">Stream my tracks:</h2>
      <div className="mt-2 flex justify-center space-x-4">
        <a href={soundcloudUrl} target="_blank" rel="noopener noreferrer">
          <button className="bg-white text-black py-2 px-4 font-mono hover:bg-gray-200 rounded-3xl flex items-center">
            <FontAwesomeIcon icon={faSoundcloud} className="mr-2" size="3x" />
            on SoundCloud
          </button>
        </a>
      </div>
    </div>
  );
};

export default Releases;
