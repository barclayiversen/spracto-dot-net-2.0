import React, { useState, useRef } from "react";
import TrackManager from "@/components/admin/tracks/trackManager";
import ImageManager from "@/components/admin/images/imageManager";

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
  if (isLoading) {
    return <div>Loading editor...</div>; // Or any loading spinner
  }

  switch (selectedItem.kind) {
    case "image":
      return <ImageManager data={data} />;
    case "track":
      return <TrackManager TrackData={data} />;
    default:
      return <pre>{JSON.stringify(data, null, 2)}</pre>;
  }
};

export default DataDisplay;
