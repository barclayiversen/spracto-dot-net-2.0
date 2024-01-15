import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ThumbnailRow = ({
  tracks,
  selectedTrack,
  openModal,
  handleThumbnailClick,
  getSoundcloudEmbedUrl,
}) => (
  <div className="thumbnail-row p-4 bg-green-200 flex justify-center">
    {tracks &&
      tracks.map((track) => (
        <div
          key={track.trackId}
          className={`thumbnail mx-4 hover:scale-110 ${
            selectedTrack?.trackId === track.trackId ? "selected" : ""
          }`}
          style={{ position: "relative", height: "100px", width: "100%" }}
          onClick={() => handleThumbnailClick(track.trackId)}
        >
          <iframe
            title={`Thumbnail - ${track.trackId}`}
            src={getSoundcloudEmbedUrl(track.trackId)}
            width="100%"
            height="100"
            frameBorder="0"
            scrolling="no"
            allow="autoplay"
          ></iframe>
          <div className="iframe-overlay"></div>
        </div>
      ))}
    <div
      className="animate-fade-in-.5 thumbnail mr-2 ml-2 add-icon bg-gray-400 flex justify-center items-center hover:scale-110"
      style={{ height: "100px", width: "100%" }}
      onClick={openModal}
    >
      <FontAwesomeIcon icon={faPlus} size="2x" />
    </div>
  </div>
);

export default ThumbnailRow;
