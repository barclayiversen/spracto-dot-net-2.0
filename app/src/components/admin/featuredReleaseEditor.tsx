import React, { useState, useEffect } from "react";
import axios from "axios";

interface TrackData {
  trackId: string;
  dlUrl?: string;
  platform?: string;
}

const FeaturedReleaseEditor: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trackData, setTrackData] = useState<TrackData | null>(null);
  const [newTrackId, setNewTrackId] = useState<string>(""); // Input field value
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Updated preview URL

  useEffect(() => {
    const fetchFeaturedRelease = async () => {
      try {
        const response = await axios.get("/api/featuredRelease");
        console.log(response.data);
        setTrackData(response.data);
        setPreviewUrl(getSoundcloudEmbedUrl(response.data.trackId));
      } catch (err) {
        setError("Failed to load featured release.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedRelease();
  }, []);

  const getSoundcloudEmbedUrl = (trackId: string) => {
    return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&color=%235bff00&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;
  };

  const handleUpdateTrackId = async () => {
    try {
      // Make a POST request to update the track ID
      await axios.post("/api/datastore/updateFeaturedRelease", { newTrackId });
      // Update the trackData with the new track ID
      setTrackData((prevData) => ({
        ...prevData,
        trackId: newTrackId,
      }));
      // Update the preview URL
      setPreviewUrl(getSoundcloudEmbedUrl(newTrackId));
    } catch (error) {
      setError("Failed to update track ID.");
    }
  };

  if (isLoading)
    return <p className="text-white">Loading featured release...</p>;
  if (error) return <p>{error}</p>;
  if (!trackData || !trackData.trackId) return null;

  return (
    <div className="grid grid-cols-2 gap-2 bg-black h-full">
      {/* Left Column */}
      <div className="bg-green-800 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4 text-white">Featured Release</h2>
        <p className="text-white">Track ID: {trackData.trackId}</p>
        <p className="text-white">Platform: {trackData.platform}</p>
        <input
          type="text"
          placeholder="New Track ID"
          value={newTrackId}
          onChange={(e) => setNewTrackId(e.target.value)}
        />
        <button
          onClick={handleUpdateTrackId}
          className="bg-blue-500 text-white py-2 px-4 mt-2 rounded"
        >
          Update Track ID
        </button>
      </div>

      {/* Right Column */}
      <div className="featured-release-container bg-black my-10 px-5 w-4/5 mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">
          Featured Release
        </h2>
        <div className="aspect-ratio-box bg-red-200">
          <iframe
            title="Featured SoundCloud Release"
            width="100%"
            height="100%"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={previewUrl}
            className="aspect-ratio-box-inside"
          ></iframe>
        </div>
        {trackData.platform === "soundcloud" && trackData.dlUrl && (
          <div className="flex justify-center mt-4">
            <a href={trackData.dlUrl} target="_blank" rel="noopener noreferrer">
              <button className="bg-white text-black py-2 px-4 font-mono hover:bg-gray-200 rounded-3xl">
                Free Download
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedReleaseEditor;
