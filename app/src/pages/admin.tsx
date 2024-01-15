// pages/admin.tsx

import React, { useState, useEffect, useRef } from "react";
import { getSession, useSession, signOut } from "next-auth/react";
import ThumbnailRow from "@/components/admin/tracks/thumbnailRow";
import axios from "axios";

import ItemList from "@/components/admin/itemList";
import DataDisplay from "@/components/admin/dataDisplay";
import Modal from "@/components/home/modal";

import Header from "@/components/admin/header";
// Define an interface for items
interface Item {
  name: string;
  kind: string;
}

const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleItemClick = async (item: Item) => {
    setSelectedItem(item);
    setIsLoading(true); // Set loading to true before fetching data

    try {
      const response = await fetch(`/api/datastore/${item.kind}`);
      const result = await response.json();

      setData(result);
    } catch (error) {
      // Handle error appropriately
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  const items = [
    { name: "Tracks", kind: "track" },
    { name: "Images", kind: "image" },
  ];

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [selectedTrack, setSelectedTrack] = useState<TrackData | null>(null);
  const [trackAdded, setTrackAdded] = useState(false);
  const [trackDeleted, setTrackDeleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tracks, setTracks] = useState<TrackData[] | null>(null);
  const getSoundcloudEmbedUrl = (trackId: string) => {
    return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&color=%235bff00&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleThumbnailClick = (trackId: string) => {
    console.log("clikced", tracks);
    const selected = tracks?.find((track) => track.trackId === trackId);
    setSelectedTrack(selected || null);
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
    <div className="max-h-screen bg-gray-600 flex flex-col">
      <Header signOut={signOut} toggleModal={toggleModal} />

      <ItemList items={items} onItemSelect={handleItemClick} />
      {selectedItem && (
        <DataDisplay
          selectedItem={selectedItem}
          data={data}
          isLoading={isLoading}
        />
      )}

      {selectedItem != null && selectedItem.kind == "track" ? (
        <ThumbnailRow
          tracks={data}
          openModal={openModal}
          handleThumbnailClick={handleThumbnailClick}
          getSoundcloudEmbedUrl={getSoundcloudEmbedUrl}
          selectedTrack={selectedTrack}
        />
      ) : (
        <></>
      )}

      {isModalOpen && (
        <Modal close={toggleModal}>
          <ItemList
            items={items}
            onItemSelect={(item) => {
              handleItemClick(item);
              toggleModal();
            }}
          />
        </Modal>
      )}
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
