import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.get(API_ENDPOINT + "/tracks");

    if (!response || response.status !== 200) {
      throw new Error(`Failed to fetch data from ${API_ENDPOINT}`);
    }

    const data = response.data;

    res.status(200).json(data);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};
