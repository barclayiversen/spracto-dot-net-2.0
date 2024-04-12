// pages/api/[kind]/add.ts
import { Datastore } from "@google-cloud/datastore";
import { NextApiRequest, NextApiResponse } from "next";
const datastore = new Datastore({
  projectId: process.env.DATASTORE_PROJECT_ID,
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const datastore = new Datastore({
    projectId: process.env.DATASTORE_PROJECT_ID,
  });

  const kind = req.body.kind;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const data = req.body;

    // Create a new entity
    const key = datastore.key(kind);
    let entity;
    if (kind === "track") {
      entity = {
        key: key,
        data: [
          {
            name: "trackId",
            value: data.trackId,
            excludeFromIndexes: false,
          },
          {
            name: "platform",
            value: data.platform,
            excludeFromIndexes: true,
          },
          {
            name: "dlUrl",
            value: data.dlUrl,
            excludeFromIndexes: true,
          },
        ],
      };
    } else if (kind === "image") {
      const url = req.body.url;
      entity = {
        key: key,
        data: [
          {
            url,
          },
        ],
      };
    } else {
      entity = {
        key,
        data,
      };
    }

    await datastore.save(entity);
  } catch (error) {
    console.error("request failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
