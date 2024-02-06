//pages/api/datastore/delete
import type { NextApiRequest, NextApiResponse } from "next";
import { Storage } from "@google-cloud/storage";
import { Datastore } from "@google-cloud/datastore";

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

  if (!bucketName) {
    return res.status(500).json({ error: "Bucket name is undefined" });
  }

  try {
    const { data } = req.body;

    // Extract the file name from the imageUrl
    const fileName = data.url.split("/").pop();

    // Delete the object from GCS
    await storage.bucket(bucketName).file(`PhotoCarousel/${fileName}`).delete();

    // Construct a key for the Datastore entity using the provided ID
    const entityKey = datastore.key([kind, datastore.int(data.id)]);

    // Delete the reference from Datastore
    await datastore.delete(entityKey);

    res.status(200).json({ message: "Image removed successfully" });
  } catch (error) {
    console.error("Deletion failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
