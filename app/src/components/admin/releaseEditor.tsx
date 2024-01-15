import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/admin/modal";
import ThumbnailRow from "@/components/admin/thumbnailRow";
import RenderTracks from "@/components/admin/renderTracks";
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

  if (isLoading) return <p className="text-white">Loading releases...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="release-editor-container animate-fade-in-.5">
      <RenderTracks
        tracks={tracks}
        selectedTrack={selectedTrack}
        makeFeaturedRelease={makeFeaturedRelease}
        deleteTrack={deleteTrack}
        getSoundcloudEmbedUrl={getSoundcloudEmbedUrl}
      />
      <ThumbnailRow
        tracks={tracks}
        openModal={openModal}
        handleThumbnailClick={handleThumbnailClick}
        getSoundcloudEmbedUrl={getSoundcloudEmbedUrl}
      />
      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleFormSubmit={handleFormSubmit}
        formValues={formValues}
        handleFormChange={handleFormChange}
      />
    </div>
  );
};

export default ReleaseEditor;
