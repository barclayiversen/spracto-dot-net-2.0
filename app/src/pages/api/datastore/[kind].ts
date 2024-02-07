import type { NextApiRequest, NextApiResponse } from "next";
import { Datastore } from "@google-cloud/datastore";

const datastore = new Datastore({
  projectId: process.env.DATASTORE_PROJECT_ID,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const kind = req.query.kind as string;

    const allowedKinds = [
      "track",
      "image",
      "upcomingRelease",
      "featuredRelease",
      "show",
    ];

    if (!allowedKinds.includes(kind)) {
      return res.status(400).json({ error: "Invalid kind" });
    }
    console.log("getting to this", kind);
    const query = datastore.createQuery(kind);
    const [entities] = await datastore.runQuery(query);

    // Map the entities to include ID and return
    const entitiesWithId = entities.map((entity) => ({
      id: entity[datastore.KEY].id, // Include the ID
      ...entity, // Include all other properties
    }));
    if (kind == "show") {
      console.log("shows", entities);
    }
    res.status(200).json(entitiesWithId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
