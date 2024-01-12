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
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({
    trackId: "",
    platform: "",
    dlUrl: "",
  });

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await axios.get("/api/tracks");

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

  const deleteTrack = () => {
    if (selectedTrack) {
      // Implement the logic to delete the selected track and update the `tracks` state
      setSelectedTrack(null);
    }
  };

  const makeFeaturedRelease = () => {
    if (selectedTrack) {
      console.log("Featured Track ID:", selectedTrack);
      // Add any additional logic for featuring a track here
    } else {
      console.log("No track selected for featuring.");
    }
  };

  const renderTracks = () => {
    if (tracks && tracks.length > 0) {
      return (
        <div className="tracks-container bg-gray-600 text-white min-h-96">
          {selectedTrack && (
            <div className="track flex bg-white">
              <div className="track-info flex flex-col items-center justify-center bg-gray-500 w-1/2 p-4">
                <h1 className="text-3xl text-center">
                  Track ID: {selectedTrack}
                </h1>
                <p className="text-center">
                  Platform:{" "}
                  {tracks.find((t) => t.trackId === selectedTrack)?.platform}
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

  const addTrack = () => {
    setShowForm(true);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    // Logic to actually add the track
    setShowForm(false);
  };
  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
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
  const renderForm = () => {
    if (showForm) {
      return (
        <form onSubmit={handleFormSubmit} className="add-track-form">
          <input
            type="text"
            name="trackId"
            value={formValues.trackId}
            onChange={handleFormChange}
            placeholder="Track ID"
          />
          <input
            type="text"
            name="platform"
            value={formValues.platform}
            onChange={handleFormChange}
            placeholder="Platform"
          />
          <input
            type="text"
            name="dlUrl"
            value={formValues.dlUrl}
            onChange={handleFormChange}
            placeholder="Download URL"
          />
          <button type="submit">Submit</button>
        </form>
      );
    }
    return null;
  };
  if (isLoading) return <p className="text-white">Loading releases...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="release-editor-container">
      {renderTracks()}
      {renderThumbnailRow()}
      {renderForm()}
    </div>
  );
};

export default ReleaseEditor;
