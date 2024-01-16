import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ThumbnailRow = ({ data, kind }) => {
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
        data.map((item, index) => {
          if (kind === "track") {
            return (
              <iframe
                key={index}
                src={getSoundcloudEmbedUrl(item.trackId)}
                className="thumbnail mx-4 hover:scale-110"
                style={{ height: "100px", width: "100px" }}
              ></iframe>
            );
          } else if (kind === "image") {
            return (
              <div className="bg-blue-800 h-100 w-100">
                <img
                  key={index}
                  src={item.url} // Replace with your actual image src
                  alt={item.altText} // Replace with your actual image alt text
                  className="thumbnail mx-4 hover:scale-110"
                  style={{ height: "100px", width: "100px" }}
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
      <div
        className="add-icon bg-gray-400 flex justify-center items-center hover:scale-110"
        style={{ height: "100px", width: "100px" }}
      >
        <FontAwesomeIcon icon={faPlus} size="2x" />
      </div>
    </div>
  );
};

export default ThumbnailRow;
