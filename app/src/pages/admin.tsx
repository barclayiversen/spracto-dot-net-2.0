// pages/admin.tsx

import React, { useState } from "react";
import { getSession, useSession, signOut } from "next-auth/react";

import ItemList from "@/components/admin/itemList";
import DataDisplay from "@/components/admin/dataDisplay";
import Modal from "@/components/home/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
      console.error("Error fetching data:", error);
      // Handle error appropriately
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  const items = [
    { name: "Tracks", kind: "track" },
    { name: "Images", kind: "image" },
    { name: "Featured Release", kind: "featuredRelease" },
    { name: "Upcoming Release", kind: "upcomingRelease" },
  ];
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="h-vh">
      <div className="flex justify-between items-center bg-black p-4 text-white">
        <button className="md:hidden" onClick={toggleModal}>
          {/* Replace with a suitable icon */}
          <FontAwesomeIcon icon={faBars} /> {/* Example using Font Awesome */}
        </button>

        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 rounded hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
      <div className="flex h-full bg-red-200">
        <div className="hidden md:block w-1/6 bg-gray-700 p-4 text-white ">
          <ItemList items={items} onItemSelect={handleItemClick} />
        </div>
        <div className="flex-1 bg-gray-200">
          {selectedItem && (
            <DataDisplay
              selectedItem={selectedItem}
              data={data}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
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
