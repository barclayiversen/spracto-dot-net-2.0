import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface TrackData {
  trackId: string;
  dlUrl?: string;
  platform?: string;
  id: string;
}

const ReleaseEditor: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tracks, setTracks] = useState<TrackData[] | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<TrackData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    trackId: "",
    platform: "",
    dlUrl: "",
  });

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await axios.get("/api/datastore/track");

        setTracks(response.data); // Assuming the response is an array of TrackData
        console.log("fulltrackdata", response.data);
      } catch (err) {
        setError("Failed to load featured releases.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReleases();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getSoundcloudEmbedUrl = (trackId: string) => {
    return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&color=%235bff00&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;
  };

  const deleteTrack = () => {
    if (selectedTrack) {
      // Implement the logic to delete the selected track and update the `tracks` state
      setSelectedTrack(null);
    }
  };

  const makeFeaturedRelease = async () => {
    if (selectedTrack) {
      console.log("featured", selectedTrack);
      const response = await axios.post(
        "/api/datastore/updateFeaturedRelease",
        selectedTrack
      );

      // TODO: toast notification for success
    } else {
      console.log("No track selected for featuring.");
    }
  };

  const handleThumbnailClick = (trackId: string) => {
    const selected = tracks?.find((track) => track.trackId === trackId);
    setSelectedTrack(selected || null);
  };

  const renderModal = () => {
    if (isModalOpen) {
      return (
        <div className="modal-overlay">
          <div className="modal-content bg-gray-400 p-5 rounded">
            <button onClick={closeModal} className="close-button">
              Close
            </button>
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
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderTracks = () => {
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    console.log("Log track info here", formValues);
    const response = await axios.post("/api/datastore/tracks/add", formValues);
    console.log("asdf", response);
    if (response.status === 200) {
      /**close modal and success response.  */
    }
    setShowForm(false);
  };
  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const renderThumbnailRow = () => {
    return (
      <>
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
            className="thumbnail mr-2 ml-2 add-icon bg-gray-400 flex justify-center items-center hover:scale-110"
            style={{ height: "100px", width: "100%" }}
            onClick={openModal}
          >
            <FontAwesomeIcon icon={faPlus} size="2x" />
          </div>
        </div>
      </>
    );
  };

  if (isLoading) return <p className="text-white">Loading releases...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="release-editor-container">
      {renderTracks()}
      {renderThumbnailRow()}
      {renderModal()}
    </div>
  );
};

export default ReleaseEditor;
