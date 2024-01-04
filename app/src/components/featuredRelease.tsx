import React, { useState, useEffect } from "react";
import axios from "axios";

const FeaturedRelease: React.FC = () => {
  const [trackId, setTrackId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedRelease = async () => {
      try {
        const response = await axios.get("/api/featuredRelease");
        setTrackId(response.data.track_id); // Assuming the response has a 'track_id' field
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load featured release.");
        setIsLoading(false);
      }
    };

    fetchFeaturedRelease();
  }, []);

  if (isLoading || !trackId) return null;
  // return <p className="text-white">Loading featured release...</p>;
  if (error) return <p>{error}</p>;

  const soundcloudEmbedUrl = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&color=%235bff00&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;

  return (
    <div className="featured-release-container my-10 px-5 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white text-center">
        Featured Release
      </h2>
      {trackId && (
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
      )}
    </div>
  );
};

export default FeaturedRelease;
