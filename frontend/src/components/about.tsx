import React, { useState, useEffect } from "react";

const About: React.FC = () => {
  const [aboutContent, setAboutContent] = useState<string>("");

  useEffect(() => {
    // Fetch the content from the /api/about endpoint
    fetch("/api/about")
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched content in state
        const content = data[0]["Content"];
        setAboutContent(content);
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
      });
  }, []);

  return (
    <div
      id="content"
      className="text-white bg-black w-full mx-auto text-center p-10"
    >
      <p className="text-xl">{aboutContent}</p>
    </div>
  );
};

export default About;
