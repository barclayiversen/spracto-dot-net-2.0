// pages/admin.tsx

import React, { useState } from "react";
import { getSession, useSession, signOut } from "next-auth/react";
import UpcomingRelease from "@/components/upcomingRelease";
import FeaturedRelease from "@/components/featuredRelease";
import ItemList from "@/components/itemList";
import DataDisplay from "@/components/dataDisplay";
// Define an interface for items
interface Item {
  name: string;
  kind: string;
}

const Admin = () => {
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

  return (
    <div className="h-screen">
      <div className="flex justify-end items-center bg-gray-800 p-4 text-white">
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 rounded hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
      <div className="flex h-full">
        <div className="w-1/3 bg-gray-700 p-4 text-white overflow-y-auto">
          <ItemList items={items} onItemSelect={handleItemClick} />
        </div>
        <div className="flex-1 p-4">
          {selectedItem && (
            <DataDisplay
              selectedItem={selectedItem}
              data={data}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
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
