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
  console.log("1");
  try {
    console.log("2", req.query);

    const kind = req.query.kind as string;

    if (kind !== req.query.kind) {
      console.log("3");

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
