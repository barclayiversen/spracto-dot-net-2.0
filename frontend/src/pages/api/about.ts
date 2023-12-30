import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Fetch the content from your data source (e.g., a database) using Axios
    const response = await axios.get(API_ENDPOINT + "/about"); // Replace with your data fetching logic

    // Extract the content from the Axios response
    const content = response.data; // Replace with your specific data extraction logic

    // Return the content as JSON response
    res.status(200).json(content);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};
