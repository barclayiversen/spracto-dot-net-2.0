// components/dataDisplay.tsx
import React, { useState } from "react";

interface DataDisplayProps {
  selectedItem: Item;
  data: any;
  isLoading: boolean;
}

const DataDisplay: React.FC<DataDisplayProps> = ({
  selectedItem,
  data,
  isLoading,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading spinner
  }

  const renderImages = () => {
    return (
      <div className="flex flex-col h-full">
        {selectedImage && (
          <div className="flex-grow">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex overflow-x-auto mt-2">
          {data.map((item: { url: string }, index: number) => (
            <img
              key={index}
              src={item.url}
              alt={`Thumbnail ${index}`}
              className="w-24 h-24 mr-2 cursor-pointer object-cover" // Adjust thumbnail size as needed
              onClick={() => setSelectedImage(item.url)}
            />
          ))}
        </div>
      </div>
    );
  };

  switch (selectedItem.kind) {
    case "upcomingRelease":
      return <UpcomingRelease />;
    case "featuredRelease":
      return <FeaturedRelease />;
    case "image":
      return renderImages();
    default:
      return <pre>{JSON.stringify(data, null, 2)}</pre>;
  }
};

export default DataDisplay;
