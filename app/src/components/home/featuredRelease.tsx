import React, { useState, useEffect } from "react";
import axios from "axios";

interface TrackData {
  trackId: string;
  dlUrl?: string;
  platform?: string;
}

const FeaturedRelease: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trackData, setTrackData] = useState<TrackData | null>(null);

  useEffect(() => {
    const fetchFeaturedRelease = async () => {
      try {
        const response = await axios.get("/api/featuredRelease");
        setTrackData(response.data);
      } catch (err) {
        setError("Failed to load featured release.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedRelease();
  }, []);

  if (isLoading)
    return <p className="text-white">Loading featured release...</p>;
  if (error) return <p>{error}</p>;
  if (!trackData || !trackData.trackId) return null;

  const soundcloudEmbedUrl = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackData.trackId}&color=%235bff00&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;

  return (
    <div className="featured-release-container my-10 px-5 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white text-center">
        Featured Set
      </h2>
      <div className="aspect-ratio-box">
        <iframe
          title="Featured SoundCloud Release"
          width="100%"
          height="100%"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={soundcloudEmbedUrl}
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
  );
};

export default FeaturedRelease;
