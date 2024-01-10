import type { NextApiRequest, NextApiResponse } from "next";
import { Storage } from "@google-cloud/storage";
import { Datastore, Query } from "@google-cloud/datastore";

// Initialize GCS and Datastore clients with project ID
const storage = new Storage({ projectId: process.env.GCS_PROJECT_ID });
const datastore = new Datastore({
  projectId: process.env.DATASTORE_PROJECT_ID,
});

const bucketName = process.env.BUCKET_NAME;
const kind = "image";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { imageUrl } = req.body;

    // Extract the file name from the imageUrl and delete it from GCS
    const fileName = imageUrl.split("/").pop();
    await storage.bucket(bucketName).file(`PhotoCarousel/${fileName}`).delete();

    // Query Datastore to find the entity with the normalized URL
    const query = datastore.createQuery(kind).filter("url", "=", imageUrl);
    const [entities] = await datastore.runQuery(query);
    if (entities.length === 0) {
      throw new Error("No matching entity found in Datastore");
    }

    // Delete the reference from Datastore
    const entityKey = entities[0][datastore.KEY];
    await datastore.delete(entityKey);

    res.status(200).json({ message: "Image removed successfully" });
  } catch (error) {
    console.error("Deletion failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
