// pages/api/featuredRelease.js
import { NextApiRequest, NextApiResponse } from "next";
import { Datastore } from "@google-cloud/datastore";

const datastore = new Datastore({
  projectId: process.env.DATASTORE_PROJECT_ID,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const datastoreClient = new Datastore();

  const query = datastore.createQuery("featuredRelease").limit(1); // Assuming "featuredRelease" is your kind

  try {
    console.log("3");

    const [featuredReleases] = await datastoreClient.runQuery(query);
    if (featuredReleases.length > 0) {
      console.log("4");

      // Assuming the structure has a 'trackId' property
      const trackId = featuredReleases[0].id;
      const dlUrl = featuredReleases[0].dlUrl;
      const platform = featuredReleases[0].platform;
      console.log(featuredReleases);
      console.log("5  " + trackId);
      res
        .status(200)
        .json({ track_id: trackId, dlUrl: dlUrl, platform: platform });
    } else {
      res.status(404).json({ error: "No featured release found" });
    }
  } catch (error) {
    console.error("Error fetching featured release:", error);
    res.status(500).send("Failed to fetch featured release");
  }
}
