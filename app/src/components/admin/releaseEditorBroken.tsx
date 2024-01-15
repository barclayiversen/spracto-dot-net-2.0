import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// Define interfaces here...
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    trackId: "",
    platform: "",
    dlUrl: "",
  });

  // Event handlers...
  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await axios.get("/api/datastore/track");
        setTracks(response.data); // Assuming the response is an array of TrackData
      } catch (err) {
        setError("Failed to load featured releases.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReleases();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("/api/datastore/tracks/add", formValues);
    console.log("asdf", response);
    if (response.status === 200) {
      closeModal();
    } else {
      /**show error */
    }
    setShowForm(false);
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  // ... Other functions (openModal, closeModal, deleteTrack, etc.)

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderModal = () =>
    isModalOpen && (
      <Modal
        closeModal={closeModal}
        handleSubmit={handleFormSubmit}
        formValues={formValues}
        handleFormChange={handleFormChange}
      />
    );

  if (isLoading) return <p className="text-white">Loading releases...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="release-editor-container">
      <TrackList
        tracks={tracks}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
      />
      <ThumbnailRow tracks={tracks} openModal={openModal} />
      {renderModal()}
    </div>
  );
};

export default ReleaseEditor;

// Define Modal, TrackList, ThumbnailRow components, and useFetchReleases hook here...
const Modal = ({ closeModal, handleSubmit, formValues, handleFormChange }) => (
  <div className="modal-overlay">
    <div className="modal-content bg-gray-400 p-5 rounded">
      <button onClick={closeModal} className="close-button">
        Close
      </button>
      <form onSubmit={handleSubmit} className="add-track-form">
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

const TrackList = ({ tracks, selectedTrack, setSelectedTrack }) => {
  if (tracks && tracks.length > 0) {
    return (
      <div className="tracks-container bg-gray-600 text-white min-h-96">
        {selectedTrack && (
          <div className="track flex bg-white">
            {/* Track details and buttons */}
          </div>
        )}
      </div>
    );
  } else {
    return <p>No tracks available.</p>;
  }
};

const ThumbnailRow = ({ tracks, openModal }) => (
  <div className="thumbnail-row p-4 bg-green-200 flex justify-center">
    {tracks &&
      tracks.map((track) => (
        <div
          key={track.trackId}
          className="thumbnail mx-4 hover:scale-110"
          style={{ position: "relative", height: "100px", width: "100%" }}
          // onClick handler for selecting a track
        >
          {/* Thumbnail iframe */}
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
);
