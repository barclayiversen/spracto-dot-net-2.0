// pages/api/upcomingRelease.js
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

  const query = datastore.createQuery("upcomingRelease").limit(1); // Limit to 1 result

  try {
    const [upcomingReleases] = await datastoreClient.runQuery(query);
    // Assuming the first result is the latest upcoming release
    const upcomingRelease = upcomingReleases[0];

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(upcomingRelease);
  } catch (error) {
    console.error("Error fetching upcoming release:", error);
    res.status(500).send("Failed to fetch upcoming release");
  }
}
