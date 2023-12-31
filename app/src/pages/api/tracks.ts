import { NextApiRequest, NextApiResponse } from "next";
import { Datastore } from "@google-cloud/datastore";

// Define TypeScript interface for a Track
interface Track {
  id: string;
  dlUrl: string;
  platform: "soundcloud" | "spotify";
}

const datastore = new Datastore({
  projectId: process.env.DATASTORE_PROJECT_ID,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const query = datastore.createQuery("track");
    try {
      const [tracks] = await datastore.runQuery(query);
      // Cast the fetched data to the Track interface

      const formattedTracks: Track[] = tracks.map((track: any) => ({
        id: track.id,
        dlUrl: track.dlUrl,
        platform: track.platform,
      }));

      res.status(200).json(formattedTracks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tracks" });
    }
  } else {
    // Handle other methods or send a 405 Method Not Allowed
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
