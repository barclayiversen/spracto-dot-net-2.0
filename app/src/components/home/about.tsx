import React, { useState, useEffect } from "react";
import axios from "axios";

const About: React.FC = () => {
  const [aboutContent, setAboutContent] = useState<string>("");

  useEffect(() => {
    // Fetch the content using Axios from the /api/about endpoint
    axios
      .get("/api/about")
      .then((response) => {
        // Set the fetched content in state

        const content = response.data;
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
