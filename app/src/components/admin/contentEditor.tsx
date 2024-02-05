// components/contentEditor.tsx

import React, { useState } from "react";
import Loading from "@/components/admin/loading";
import axios from "axios";
const ContentEditor = ({
  content,
  kind,
  isLoading,
  setIsLoading,
  // setImageDeleted,
  triggerDataRefresh,
}) => {
  //state variables
  const [editedContent, setEditedContent] = useState(content);

  // //component scoped functions
  // const handleChange = (e) => {
  //   setEditedContent({ ...editedContent, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async () => {
  //   // Logic to save the edited content
  // };

  // const handleImageDeletion = () => {
  //   setImageDeleted(true);
  // };

  const handleMakeFeatured = async (trackData) => {
    // Logic to make the track a featured release
    const response = await axios.post(
      "/api/datastore/updateFeaturedRelease",
      trackData
    );
    console.log("update", response);
  };

  const handleDelete = async (kind, content) => {
    console.log("kkkkkk", kind);
    console.log("kkxccccc", content);

    if (kind === "track") {
      setIsLoading(true); // Start loading
      try {
        const response = await axios.delete(`/api/datastore/${kind}/delete`, {
          data: { kind: kind, id: content.id },
        });
        if (response.status === 200) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error deleting track", error);
        // Handle error
        setIsLoading(false);
      } finally {
        // handleImageDeletion();
        setIsLoading(false);

        // End loading
      }
    }

    if (kind === "image") {
      setIsLoading(true); // Start loading
      try {
        const response = await axios.delete(`/api/datastore/${kind}/delete`, {
          data: { kind: kind, id: content.id, url: content.url },
        });
        if (response.status === 200) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error deleting image", error);
        // Handle error
        setIsLoading(false);
      } finally {
        triggerDataRefresh();
        setIsLoading(false);
        // End loading
      }
    }
  };

  const getSoundcloudEmbedUrl = (trackId: string) => {
    return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&color=%235bff00&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;
  };

  if (!content) {
    return <div>Select an item to edit.</div>;
  }

  if (isLoading) {
    return <Loading />;
  }
  //Markup
  return (
    <div className="w-11/12 overflow-auto bg-black">
      <div className="content-editor p-4 bg-gray-500 animate-fade-in-.5">
        {kind === "track" && (
          <div className="flex">
            <div className="flex-1 p-4">
              {/* Left Column: Track Information and Buttons */}
              <p className="text-4xl text-black">Track Id: {content.trackId}</p>
              <p className="text-2xl text-black">
                Platform: {content.platform}
              </p>
              <p className="text-xl text-black">ID: {content.id}</p>

              <button
                onClick={() => handleMakeFeatured(content)}
                className="mr-2 px-4 py-2 bg-green-500 rounded hover:bg-green-700 transition duration-300"
              >
                Make Featured Release
              </button>
              <button
                onClick={() => handleDelete(kind, content.id)}
                className="mr-2 px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition duration-300"
              >
                Delete
              </button>
            </div>
            <div className="flex-1 p-4">
              {/* Right Column: Iframe */}
              <iframe
                src={getSoundcloudEmbedUrl(content.trackId)}
                width="100%"
                height="600"
                frameBorder="0"
                scrolling="no"
                allow="autoplay"
              ></iframe>
            </div>
          </div>
        )}

        {kind === "image" && (
          <div>
            <img className="mx-auto" src={content.url} />
          </div>
        )}

        <button
          onClick={() => handleDelete(kind, content)}
          className="px-4 py-2 mt-10 bg-red-500 rounded hover:bg-red-700 transition duration-300"
        >
          Delete item
        </button>
      </div>
    </div>
  );
};

export default ContentEditor;
