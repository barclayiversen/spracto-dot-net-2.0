// pages/api/[kind]/add.ts
import { Datastore } from "@google-cloud/datastore";
import { Storage } from "@google-cloud/storage"; // Import the Google Cloud Storage client

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const datastore = new Datastore({
    projectId: process.env.DATASTORE_PROJECT_ID,
  });

  // Initialize Google Cloud Storage client
  const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID, // Ensure you have GCP_PROJECT_ID in your environment variables
  });

  const { kind, id, url } = req.body;

  try {
    if (!id) {
      throw new Error("Missing identifier");
    }

    // Construct the datastore key
    const key = datastore.key([kind, datastore.int(id)]);

    // Delete the entity from Datastore
    console.log("Deleting entity from Datastore", key);
    await datastore.delete(key);

    // Delete the object on GCS if it's an image
    if (kind === "image") {
      // Parse the URL to extract bucket name and object name
      const urlPattern = /^https:\/\/storage\.googleapis\.com\/([^\/]+)\/(.+)$/;
      const matches = url.match(urlPattern);
      if (!matches) {
        throw new Error("Invalid URL format");
      }
      const bucketName = matches[1];
      const objectName = matches[2];
      // Delete the object from GCS
      console.log(`Deleting object ${objectName} from bucket ${bucketName}`);
      await storage.bucket(bucketName).file(objectName).delete();
    }

    res.status(200).json({ message: `${kind} deleted successfully` });
  } catch (error) {
    console.error("Request failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
