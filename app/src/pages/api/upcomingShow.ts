// pages/api/upcomingShow.js
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

  // Get the current date and time
  const currentDate = new Date();

  // Update the query to use the "upcomingShow" kind and filter by the "showTime" property
  const query = datastore
    .createQuery("upcomingShow")
    .filter("showTime", ">", currentDate)
    .limit(1); // Still limit to 1 result to get the nearest upcoming show

  try {
    const [upcomingShows] = await datastoreClient.runQuery(query);
    // Assuming the first result is the nearest upcoming show (since we limit the result to 1)
    const upcomingShow = upcomingShows[0] ? upcomingShows[0] : {};
    console.log("AAAAAAA", upcomingShow);
    res.setHeader("Content-Type", "application/json");
    // Check if we got a result; if not, send a 204 No Content response
    if (Object.keys(upcomingShow).length > 0) {
      res.status(200).json(upcomingShow);
    } else {
      res.status(200).send("No upcoming shows found");
    }
  } catch (error) {
    console.error("Error fetching upcoming show:", error);
    res.status(500).send("Failed to fetch upcoming show");
  }
}
