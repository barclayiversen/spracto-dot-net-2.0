// pages/admin.tsx

import React, { useState, useEffect, useRef } from "react";
import { getSession, useSession, signOut } from "next-auth/react";
import ThumbnailRow from "@/components/admin/thumbnailRow";
import axios from "axios";
import ItemList from "@/components/admin/itemList";
import Header from "@/components/admin/header";
import ContentEditor from "@/components/admin/contentEditor";
import AddContentModal from "@/components/admin/addContentModal";

// Define an interface for items
interface Item {
  name: string;
  kind: string;
}

const Admin = () => {
  const [refreshData, setRefreshData] = useState(false);

  const [selectedContent, setSelectedContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<TrackData | null>(null);
  const [trackAdded, setTrackAdded] = useState(false);
  const [trackDeleted, setTrackDeleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tracks, setTracks] = useState<TrackData[] | null>(null);

  const handleContentSelect = (content) => {
    setIsLoading(true);
    setSelectedContent(content);
    setIsLoading(false);
  };

  const triggerDataRefresh = () => {
    setSelectedContent(null);
    setRefreshData((prev) => !prev); // Toggle to trigger useEffect
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

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      // Fetch data logic here
      // For example, fetching image list for ThumbnailRow
      try {
        const response = await axios.get(`/api/datastore/image`);
        setData(response.data); // Assuming setData updates the state used by ThumbnailRow
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [refreshData]); // Depend on refreshData to re-fetch whenever it changes

  return (
    <div className="max-h-screen min-h-screen bg-gray-600 flex flex-col">
      {/* Header */}
      <Header signOut={signOut} toggleModal={toggleModal} />
      {/* Main Content Area */}
      <div className="flex flex-grow overflow-hidden">
        {/* ItemList */}
        <ItemList items={items} onItemSelect={handleItemClick} />
        {/* ContentEditor */}
        <ContentEditor
          content={selectedContent}
          kind={selectedItem?.kind}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          triggerDataRefresh={triggerDataRefresh}
        />
      </div>
      {/* ThumbnailRow */}
      <ThumbnailRow
        data={data}
        kind={selectedItem?.kind}
        onSelect={handleContentSelect}
        toggleModal={toggleModal}
        triggerDataRefresh={triggerDataRefresh}
      />
      <AddContentModal
        triggerDataRefresh={triggerDataRefresh}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        kind={selectedItem?.kind}
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
