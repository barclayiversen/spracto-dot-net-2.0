// pages/admin.tsx

import React, { useState, useEffect, useRef } from "react";
import { getSession, useSession, signOut } from "next-auth/react";
import ThumbnailRow from "@/components/admin/thumbnailRow";
import axios from "axios";
import ItemList from "@/components/admin/itemList";
import Header from "@/components/admin/header";
import ContentEditor from "@/components/admin/contentEditor";
import AddContentModal from "@/components/admin/addContentModal";

// Define interfaces
interface Item {
  name: string;
  kind: string;
}

interface Content {
  id?: string;
  trackId?: string;
  platform?: string;
  url?: string;
  dlUrl?: string;
}

const Admin = () => {
  //State
  const [refreshDetails, setRefreshDetails] = useState({
    refresh: false,
    kind: null,
  });
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const [selectedTrack, setSelectedTrack] = useState<TrackData | null>(null);
  // const [trackAdded, setTrackAdded] = useState(false);
  // const [trackDeleted, setTrackDeleted] = useState(false);
  // const [tracks, setTracks] = useState<TrackData[] | null>(null);

  //Static object
  const items = [
    { name: "Tracks", kind: "track" },
    { name: "Images", kind: "image" },
  ];
  //Functions
  const handleContentSelect = (content: Content) => {
    setIsLoading(true);
    setSelectedContent(content);
    setIsLoading(false);
  };

  const triggerDataRefresh = (kind: any) => {
    setSelectedContent(null);
    setRefreshDetails({ refresh: !refreshDetails.refresh, kind: kind }); // Toggle to trigger useEffect
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleItemClick = async (item: Item) => {
    setSelectedItem(item);
    setSelectedContent(null);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/datastore/${item.kind}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log("ERROR FETCHING ITEMS", error);
    } finally {
      setIsLoading(false);
    }
  };

  //hooks
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

  //   if (trackAdded || trackDeleted) {
  //     setTrackAdded(false);
  //     setTrackDeleted(false);
  //   }
  // }, [trackAdded, trackDeleted]);

  useEffect(() => {
    if (!refreshDetails.kind) return; // Early exit if kind is not set
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/datastore/${refreshDetails.kind}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [refreshDetails]); // Depend on refreshDetails to re-fetch whenever it changes

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
          kind={selectedItem?.kind ?? ""}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          triggerDataRefresh={triggerDataRefresh}
        />
      </div>
      {/* ThumbnailRow */}
      <ThumbnailRow
        data={data}
        kind={selectedItem?.kind ?? ""}
        onSelect={handleContentSelect}
        toggleModal={toggleModal}
        // triggerDataRefresh={triggerDataRefresh}
      />
      <AddContentModal
        triggerDataRefresh={triggerDataRefresh}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        kind={selectedItem?.kind ?? ""}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Admin;

const NEXTAUTH_URL = process.env.NEXTAUTH_URL;
console.log;
export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: NEXTAUTH_URL + "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
