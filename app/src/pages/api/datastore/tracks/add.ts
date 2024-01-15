import type { NextApiRequest, NextApiResponse } from "next";
import { Datastore } from "@google-cloud/datastore";

const datastore = new Datastore({
  projectId: process.env.DATASTORE_PROJECT_ID,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const trackData = req.body;
    console.log("", trackData);

    // Create a new entity for the "track" kind
    const trackKey = datastore.key("track");
    const trackEntity = {
      key: trackKey,
      data: [
        {
          name: "trackId",
          value: trackData.trackId,
          excludeFromIndexes: true,
        },
        {
          name: "platform",
          value: trackData.platform,
          excludeFromIndexes: true,
        },
        {
          name: "dlUrl",
          value: trackData.dlUrl,
          excludeFromIndexes: true,
        },
      ],
    };

    await datastore.save(trackEntity);

    res.status(200).json({ message: "Track added successfully" });
  } catch (error) {
    console.error("request failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
