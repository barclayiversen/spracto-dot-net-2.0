// pages/api/[kind]/add.ts
import { Datastore } from "@google-cloud/datastore";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const datastore = new Datastore({
    projectId: process.env.DATASTORE_PROJECT_ID,
  });

  const { kind, id } = req.body;

  try {
    if (!id) {
      throw new Error("Missing identifier");
    }

    // Construct the datastore key
    const key = datastore.key([kind, datastore.int(id)]);

    // Delete the entity
    await datastore.delete(key);

    res.status(200).json({ message: `${kind} deleted successfully` });
  } catch (error) {
    console.error("request failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
