// pages/admin.tsx

import React, { useState, useEffect, useRef } from "react";
import { getSession, useSession, signOut } from "next-auth/react";
import ThumbnailRow from "@/components/admin/thumbnailRow";
import axios from "axios";
import ItemList from "@/components/admin/itemList";
import Header from "@/components/admin/header";
import ContentEditor from "@/components/admin/contentEditor";
// Define an interface for items
interface Item {
  name: string;
  kind: string;
}

const Admin = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<TrackData | null>(null);
  const [trackAdded, setTrackAdded] = useState(false);
  const [trackDeleted, setTrackDeleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tracks, setTracks] = useState<TrackData[] | null>(null);

  const handleContentSelect = (content) => {
    setSelectedContent(content);
  };

  const handleItemClick = async (item: Item) => {
    setSelectedItem(item);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/datastore/${item.kind}`);
      const result = await response.json();
      // setSelectedContent(result); // Set the selected content
      setData(result); // Assuming this is still needed
    } catch (error) {
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  const items = [
    { name: "Tracks", kind: "track" },
    { name: "Images", kind: "image" },
  ];

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await axios.get("/api/datastore/track");
        setTracks(response.data);
      } catch (err) {
        setError("Failed to load tracks.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchReleases();
    // Reset the trackAdded and trackDeleted flags
    if (trackAdded || trackDeleted) {
      setTrackAdded(false);
      setTrackDeleted(false);
    }
  }, [trackAdded, trackDeleted]);

  return (
    <div className="max-h-screen min-h-screen bg-gray-600 flex flex-col">
      {/* Header */}
      <Header signOut={signOut} toggleModal={toggleModal} />
      {/* Main Content Area */}
      <div className="flex flex-grow overflow-hidden">
        {/* ItemList */}
        <ItemList items={items} onItemSelect={handleItemClick} />
        {/* ContentEditor */}
        <ContentEditor content={selectedContent} kind={selectedItem?.kind} />
      </div>
      {/* ThumbnailRow */}
      <ThumbnailRow
        data={data}
        kind={selectedItem?.kind}
        onSelect={handleContentSelect}
      />
    </div>
  );
};

export default Admin;

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
