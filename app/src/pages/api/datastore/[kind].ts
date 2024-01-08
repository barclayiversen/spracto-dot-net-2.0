// pages/api/datastore/[kind].ts

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
    ];

    if (!allowedKinds.includes(kind)) {
      return res.status(400).json({ error: "Invalid kind" });
    }

    const query = datastore.createQuery(kind);
    const [entities] = await datastore.runQuery(query);

    res.status(200).json(entities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
