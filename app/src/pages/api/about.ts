import { NextApiRequest, NextApiResponse } from "next";
import { Datastore } from "@google-cloud/datastore";
import { Console } from "console";

const datastore = new Datastore({
  projectId: process.env.DATASTORE_PROJECT_ID,
});

interface About {
  Content: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const datastoreClient = new Datastore();

  const query = datastore.createQuery("about").limit(1); // Limit to 1 result

  try {
    const [about] = await datastoreClient.runQuery(query);
    // Send the "about" content as a JSON response
    const content = about[0]["content"];
    res.setHeader("Content-Type", "application/json");
    res.json(content);
  } catch (error) {
    console.error("Error fetching about:", error);
    res.status(500).send("Failed to fetch about");
  }
}
