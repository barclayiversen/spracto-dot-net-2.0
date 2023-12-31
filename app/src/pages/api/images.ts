import { NextApiRequest, NextApiResponse } from "next";
import { Datastore } from "@google-cloud/datastore";

const datastore = new Datastore({
  projectId: process.env.DATASTORE_PROJECT_ID,
});

interface Image {
  url: string;
}

export default async function imagesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    const query = datastore.createQuery("image");
    const [images] = await datastore.runQuery(query);
    // Map the images to extract URLs
    const urls: string[] = images.map((img: any) => img.url);
    res.status(200).json(urls);
  } catch (error) {
    console.error("Failed to get images:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
}
