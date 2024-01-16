// components/contentEditor.tsx

import React, { useState } from "react";

const ContentEditor = ({ content, kind }) => {
  //state variables
  const [editedContent, setEditedContent] = useState(content);
  //component scoped functions
  const handleChange = (e) => {
    setEditedContent({ ...editedContent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Logic to save the edited content
  };

  const handleMakeFeatured = () => {
    // Logic to make the track a featured release
  };

  const handleDelete = () => {
    // Logic to delete the track
  };

  const getSoundcloudEmbedUrl = (trackId: string) => {
    return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&color=%235bff00&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;
  };

  if (!content) {
    return <div>Select an item to edit.</div>;
  }
  //Markup
  return (
    <div className="w-11/12 overflow-auto">
      <div className="content-editor p-4 bg-gray-200">
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
                onClick={handleMakeFeatured}
                className="mr-2 px-4 py-2 bg-green-500 rounded hover:bg-green-700 transition duration-300"
              >
                Make Featured Release
              </button>
              <button
                onClick={handleDelete}
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
            <img src={content.url} />
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-red-500 rounded hover:bg-red-700 transition duration-300"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ContentEditor;
