import React from "react";

const RenderTracks = ({
  tracks,
  selectedTrack,
  makeFeaturedRelease,
  deleteTrack,
  getSoundcloudEmbedUrl,
}) => {
  if (tracks && tracks.length > 0) {
    return (
      <div className="tracks-container bg-gray-600 text-white min-h-96">
        {selectedTrack && (
          <div className="track flex bg-white">
            <div className="track-info flex flex-col items-center justify-center bg-gray-500 w-1/2 p-4">
              <h1 className="text-3xl text-center">
                Track ID: {selectedTrack.trackId}
              </h1>
              <p className="text-center">
                Platform: {tracks.find((t) => t === selectedTrack)?.platform}
                <br />
                ID: {tracks.find((t) => t === selectedTrack)?.id}
              </p>
              <div className="buttons-container flex items-center justify-center mt-4">
                <button
                  onClick={makeFeaturedRelease}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Make Featured Release
                </button>
                <button
                  onClick={deleteTrack}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                >
                  Delete Track
                </button>
              </div>
            </div>
            <div className="track-iframe w-1/2 p-4 relative">
              <iframe
                title={`Track - ${selectedTrack}`}
                src={getSoundcloudEmbedUrl(selectedTrack.trackId)}
                width="100%"
                height="600"
                frameBorder="0"
                scrolling="no"
                allow="autoplay"
              ></iframe>
              <div
                className="iframe-overlay"
                onClick={() => console.log("Track iframe clicked")}
              ></div>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <p>No tracks available.</p>;
  }
};

export default RenderTracks;
