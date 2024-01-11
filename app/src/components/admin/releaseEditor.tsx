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

  const renderTracks = () => {
    if (tracks && tracks.length > 0) {
      return (
        <div className="tracks-container bg-black text-white">
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
            <div className="track bg-black w-1/3 mx-auto">
              <h2>Track ID: {selectedTrack}</h2>
              <p>
                Platform:{" "}
                {tracks.find((t) => t.trackId === selectedTrack)?.platform}
              </p>
              <iframe
                title={`Track - ${selectedTrack}`}
                src={getSoundcloudEmbedUrl(selectedTrack)}
                width="100%"
                height="166"
                frameBorder="0"
                scrolling="no"
                allow="autoplay"
              ></iframe>
            </div>
          )}
        </div>
      );
    } else {
      return <p>No tracks available.</p>;
    }
  };

  if (isLoading)
    return <p className="text-white">Loading featured release...</p>;
  if (error) return <p>{error}</p>;

  return <div className="release-editor-container">{renderTracks()}</div>;
};

export default ReleaseEditor;
