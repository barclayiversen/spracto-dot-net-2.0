import React, { useState, useEffect } from "react";
import axios from "axios";

interface TrackData {
  trackId: string;
  dlUrl?: string;
  platform?: string;
}

const ReleaseEditor: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tracks, setTracks] = useState<TrackData[] | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await axios.get("/api/tracks");
        console.log("res", response);
        setTracks(response.data); // Assuming the response is an array of TrackData
      } catch (err) {
        setError("Failed to load featured releases.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReleases();
  }, []);

  const getSoundcloudEmbedUrl = (trackId: string) => {
    return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&color=%235bff00&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;
  };

  const handleTrackSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTrack(event.target.value);
  };

  const addTrack = () => {
    // Implement the logic to add a new track and update the `tracks` state
  };

  const deleteTrack = () => {
    if (selectedTrack) {
      // Implement the logic to delete the selected track and update the `tracks` state
      setSelectedTrack(null);
    }
  };

  const renderTracks = () => {
    if (tracks && tracks.length > 0) {
      return (
        <div className="tracks-container bg-gray-600 text-white min-h-96">
          <select
            onChange={handleTrackSelect}
            value={selectedTrack || ""}
            className="bg-blue-500 text-white py-2 px-4 mt-2 rounded"
          >
            <option value="">Select a Track</option>
            {tracks.map((track) => (
              <option key={track.trackId} value={track.trackId}>
                {track.trackId}
              </option>
            ))}
          </select>

          {selectedTrack && (
            <div className="track  flex bg-white">
              <div className="track-info bg-green-600 w-1/2 p-4 items-center justify-center ">
                <h2>Track ID: {selectedTrack}</h2>
                <p>
                  Platform:{" "}
                  {tracks.find((t) => t.trackId === selectedTrack)?.platform}
                </p>
                <div className="buttons-container flex items-center justify-center">
                  <button
                    onClick={addTrack}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Add Track
                  </button>
                  <button
                    onClick={deleteTrack}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete Track
                  </button>
                </div>
              </div>
              <div
                className="track-iframe w-1/2 p-4"
                style={{ position: "relative" }}
              >
                <iframe
                  title={`Track - ${selectedTrack}`}
                  src={getSoundcloudEmbedUrl(selectedTrack)}
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

  const handleThumbnailClick = (trackId: string) => {
    setSelectedTrack(trackId);
  };

  const renderThumbnailRow = () => {
    return (
      <div className="thumbnail-row bg-black p-4 flex justify-center">
        {tracks &&
          tracks.map((track) => (
            <div
              key={track.trackId}
              className={`thumbnail p-2 hover:scale-110 ${
                selectedTrack === track.trackId ? "selected" : ""
              }`}
              style={{ position: "relative" }}
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
      </div>
    );
  };

  if (isLoading) return <p className="text-white">Loading releases...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="release-editor-container">
      {renderTracks()}
      {renderThumbnailRow()}
    </div>
  );
};

export default ReleaseEditor;
