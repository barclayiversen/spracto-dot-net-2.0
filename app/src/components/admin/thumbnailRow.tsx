// pages/thumbnailRow.tsx

import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ThumbnailRow = ({
  data,
  kind,
  onSelect,
  toggleModal,
  triggerDataRefresh,
}) => {
  // Log the data and kind props whenever they change
  useEffect(() => {
    console.log("Data: ", data);
    console.log("Kind: ", kind);
  }, [data, kind]);

  const getSoundcloudEmbedUrl = (trackId: string) => {
    return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&color=%235bff00&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;
  };

  return (
    <div className="thumbnail-row w-full mx-auto float-right p-4 bg-gray-500 flex justify-center">
      {/* Your existing rendering logic */}
      {kind &&
        data &&
        data.map((item) => {
          if (kind === "track") {
            return (
              <div
                className="relative hover:scale-110"
                key={item.trackId}
                onClick={() => onSelect(item)} // Corrected here
              >
                <iframe
                  src={getSoundcloudEmbedUrl(item.trackId)}
                  className="thumbnail mx-4"
                  style={{ height: "100px", width: "100px" }}
                ></iframe>
                <div className="absolute top-0 left-0 w-full h-full bg-transparent z-10"></div>
              </div>
            );
          } else if (kind === "image") {
            return (
              <div className="bg-blue-800 h-100 w-100">
                <img
                  key={item.id}
                  src={item.url} // Replace with your actual image src
                  alt={item.altText} // Replace with your actual image alt text
                  className="thumbnail mx-4 hover:scale-110"
                  style={{ height: "100px", width: "100px" }}
                  onClick={() => onSelect(item)}
                />
              </div>
            );
          }
        })}
      {(!kind || !data || data.length === 0) && (
        <div className="thumbnail-placeholder">
          Select a category to view thumbnails
        </div>
      )}
      {kind && (
        <div
          className="add-icon bg-gray-400 flex justify-center items-center hover:scale-110"
          style={{ height: "100px", width: "100px" }}
          onClick={toggleModal}
        >
          <FontAwesomeIcon icon={faPlus} size="2x" />
        </div>
      )}
    </div>
  );
};

export default ThumbnailRow;
