// UpcomingRelease.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";

interface UpcomingReleaseData {
  albumArtUrl: string;
  albumName: string;
  releaseDate: string;
}

const getFormattedReleaseDate = (dateString: any) => {
  const date = new Date(dateString);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `Coming out in ${month} ${year}`;
};

const UpcomingRelease: React.FC = () => {
  const [upcomingRelease, setUpcomingRelease] =
    useState<UpcomingReleaseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpcomingRelease = async () => {
      try {
        const response = await axios.get("/api/upcomingRelease");
        setUpcomingRelease(response.data);
      } catch (err) {
        setError("Failed to load upcoming release.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpcomingRelease();
  }, []);

  if (isLoading) return <p>Loading upcoming release...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="upcoming-release-container py-10 px-5 text-center bg-black max-w-2xl mx-auto">
      {upcomingRelease && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-white">
            Upcoming Release
          </h2>
          <img
            src={upcomingRelease.albumArtUrl}
            alt={`Album art for ${upcomingRelease.albumName}`}
            className="mx-auto"
          />
          <p className="mt-3 text-lg">{upcomingRelease.albumName}</p>
          <p className="text-sm text-white">
            {getFormattedReleaseDate(upcomingRelease.releaseDate)}
          </p>
        </>
      )}
    </div>
  );
};

export default UpcomingRelease;
