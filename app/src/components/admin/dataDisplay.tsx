import React, { useState, useRef } from "react";
import TrackManager from "@/components/admin/tracks/trackManager";
import ImageManager from "@/components/admin/images/imageManager";

interface DataDisplayProps {
  selectedItem: Item;
  data: any;
  isLoading: boolean;
  selectedTrack: TrackData;
}

const DataDisplay: React.FC<DataDisplayProps> = ({
  selectedItem,
  data,
  isLoading,
  selectedTrack,
}) => {
  console.log("selected',", selectedTrack);
  if (isLoading) {
    return <div>Loading editor...</div>; // Or any loading spinner
  }

  switch (selectedItem.kind) {
    case "image":
      return <ImageManager data={data} />;
    case "track":
      return <TrackManager TrackData={data} selectedTrack={selectedTrack} />;
    default:
      return <pre>{JSON.stringify(data, null, 2)}</pre>;
  }
};

export default DataDisplay;
