import React, { useState, useRef } from "react";
import RenderImages from "@/components/admin/renderImages";
import UpcomingRelease from "@/components/home/upcomingRelease";
import FeaturedReleaseEditor from "@/components/admin/featuredReleaseEditor";
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
    return <div>Loading...</div>; // Or any loading spinner
  }

  switch (selectedItem.kind) {
    case "upcomingRelease":
      return <UpcomingRelease />;
    case "featuredRelease":
      return <FeaturedReleaseEditor />;
    case "image":
      return <RenderImages data={data} />;

    default:
      return <pre>{JSON.stringify(data, null, 2)}</pre>;
  }
};

export default DataDisplay;
