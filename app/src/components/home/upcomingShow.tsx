import React, { useState, useEffect } from "react";
import axios from "axios";

interface upcomingShowData {
  flyerUrl: string;
  showTime: string;
  ticketLink: string;
}

const getFormattedReleaseDate = (dateString: string) => {
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
  const day = date.getDay();

  return `Come see me ${month} ${day}!`;
};

const upcomingShow: React.FC = () => {
  const [upcomingShow, setupcomingShow] = useState<upcomingShowData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchupcomingShow = async () => {
      try {
        const response = await axios.get("/api/upcomingShow");
        console.log("response", response);
        if (response.data && response.data.flyerUrl) {
          setupcomingShow(response.data);
        } else {
          setupcomingShow(null);
        }
      } catch (err) {
        setError("Failed to load Upcoming Show.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchupcomingShow();
  }, []);

  if (isLoading) return <p>Loading Upcoming Show...</p>;
  if (error) return <p>{error}</p>;
  if (!upcomingShow) {
    console.log("error", error);
    return null; // Do not render if no release data
  }

  return (
    <div className="upcoming-release-container py-10 px-5 text-center bg-black max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Come see me at my next show supporting JUUSH!
      </h2>
      <a
        href={upcomingShow.ticketLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={upcomingShow.flyerUrl}
          alt={`Album art for ${upcomingShow.flyerUrl}`}
          className="mx-auto"
        />
      </a>
      <p className="mt-3 text-lg">{upcomingShow.flyerUrl}</p>

      <a
        href={upcomingShow.ticketLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="bg-white text-black py-2 px-4 font-mono hover:bg-gray-200 rounded-3xl">
          RSVP here to get in free before 10:30!
        </button>
      </a>
    </div>
  );
};

export default upcomingShow;
