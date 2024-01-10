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
    <div className="h-screen flex flex-col ">
      <div className="bg-black p-4 text-white">
        <div className="flex justify-between items-center">
          <button className="md:hidden" onClick={toggleModal}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex flex-1">
        <div className="hidden md:block w-1/6 bg-gray-800 p-4 text-white">
          <ItemList items={items} onItemSelect={handleItemClick} />
        </div>
        <div className="flex-1 bg-black">
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
