import { NextApiRequest, NextApiResponse } from "next";
import { Datastore } from "@google-cloud/datastore";

const projectId = process.env.DATASTORE_PROJECT_ID;

const datastore = new Datastore({
  projectId,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const kind = "track";
    const trackId = req.body.trackData.trackId;
    console.log("$%$$$$$$$", req.body);
    try {
      // Query for the entity using the trackId property
      const query = datastore.createQuery(kind).filter("trackId", "=", trackId);
      const [entities] = await datastore.runQuery(query);
      console.log("matches: ", entities);
      // Check if the entity exists
      if (entities.length > 0) {
        // Assuming you want to delete all matching entities, you can loop through and delete them
        for (const entity of entities) {
          await datastore.delete(entity[datastore.KEY]);
        }
        res.status(204).end();
      } else {
        // Entity not found
        console.log("not found");
        res.status(200).json({ message: "Entity not found" });
        // res.status(404).json({ error: "Entity not found" });
      }
    } catch (error) {
      console.error("Error deleting entity:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
