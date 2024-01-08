// pages/admin.tsx

import React, { useState } from "react";
import { getSession, useSession, signOut } from "next-auth/react";
import UpcomingRelease from "@/components/upcomingRelease";
import FeaturedRelease from "@/components/featuredRelease";
// Define an interface for items
interface Item {
  name: string;
  kind: string;
}

const Admin = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [data, setData] = useState([]);

  const handleItemClick = async (item: Item) => {
    setSelectedItem(item);

    // Fetch data from your API route which interacts with Google Cloud Datastore
    const response = await fetch(`/api/datastore/${item.kind}`);
    const result = await response.json();

    setData(result);
  };

  const items = [
    { name: "Tracks", kind: "track" },
    { name: "Images", kind: "image" },
    { name: "Featured Release", kind: "featuredRelease" },
    { name: "Upcoming Release", kind: "upcomingRelease" },
  ];

  const renderData = () => {
    switch (selectedItem?.kind) {
      case "upcomingRelease":
        return <UpcomingRelease />;
      case "featuredRelease":
        return <FeaturedRelease />;
      default:
        return <pre>{JSON.stringify(data, null, 2)}</pre>;
    }
  };

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
          <ul>
            {items.map((item) => (
              <li
                key={item.name}
                className="mb-2 cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 p-4">
          {selectedItem && (
            <div>
              <h2 className="text-xl mb-4">Data for {selectedItem.name}</h2>
              {renderData()}
            </div>
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
