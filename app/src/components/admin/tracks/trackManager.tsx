import React, { useState, useEffect } from "react";
import axios from "axios";

import ThumbnailRow from "@/components/admin/tracks/thumbnailRow";
import RenderTracks from "@/components/admin/tracks/renderTracks";
import AddTrackModal from "@/components/admin/tracks/addTrackModal";

interface TrackData {
  trackId: string;
  dlUrl?: string;
  platform?: string;
  id: string;
}

const ReleaseEditor: React.FC<TrackData> = () => {
  // const [trackAdded, setTrackAdded] = useState(false);
  // const [trackDeleted, setTrackDeleted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const [tracks, setTracks] = useState<TrackData[] | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<TrackData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    trackId: "",
    platform: "",
    dlUrl: "",
  });

  const [modalAnimationState, setModalAnimationState] = useState("exited");
  const startModalCloseAnimation = () => {
    setModalAnimationState("leaving"); // Start the fade-out animation
  };

  const handleModalAnimationEnd = () => {
    if (modalAnimationState === "leaving") {
      setModalAnimationState("exited");
      closeModal(); // Actually close the modal
    }
  };

  // useEffect(() => {
  //   const fetchReleases = async () => {
  //     try {
  //       const response = await axios.get("/api/datastore/track");
  //       setTracks(response.data);
  //     } catch (err) {
  //       setError("Failed to load tracks.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchReleases();

  //   // Reset the trackAdded and trackDeleted flags
  //   if (trackAdded || trackDeleted) {
  //     setTrackAdded(false);
  //     setTrackDeleted(false);
  //   }
  // }, [trackAdded, trackDeleted]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getSoundcloudEmbedUrl = (trackId: string) => {
    return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&color=%235bff00&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;
  };

  const deleteTrack = async () => {
    if (selectedTrack) {
      setIsDeleting(true); // Start loading
      try {
        const response = await axios.delete("/api/datastore/tracks/delete", {
          data: { trackData: selectedTrack },
        });

        if (response.status === 204) {
          setTrackDeleted(true); // Set the flag to true when a track is deleted
          setSelectedTrack(null);
        }
      } catch (error) {
        console.error("Error deleting track", error);
        // Handle error
      } finally {
        setIsDeleting(false); // End loading
      }
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
    console.log("add track response", response);
    if (response.status === 200) {
      startModalCloseAnimation();
      setTrackAdded(true); // Set the flag to true when a track is added
    } else {
      // Show error
      console.log("ERROR NUMBER 420");
    }
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  if (isLoading) return <p className="text-white">Loading releases...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="animate-fade-in-.5">
      <RenderTracks
        isDeleting={isDeleting}
        tracks={tracks}
        selectedTrack={selectedTrack}
        makeFeaturedRelease={makeFeaturedRelease}
        deleteTrack={deleteTrack}
        getSoundcloudEmbedUrl={getSoundcloudEmbedUrl}
      />
      {/* <ThumbnailRow
        tracks={tracks}
        openModal={openModal}
        handleThumbnailClick={handleThumbnailClick}
        getSoundcloudEmbedUrl={getSoundcloudEmbedUrl}
      /> */}
      <AddTrackModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleFormSubmit={handleFormSubmit}
        formValues={formValues}
        handleFormChange={handleFormChange}
        startModalCloseAnimation={startModalCloseAnimation}
        handleModalAnimationEnd={handleModalAnimationEnd}
        modalAnimationState={modalAnimationState}
      />
    </div>
  );
};

export default ReleaseEditor;
