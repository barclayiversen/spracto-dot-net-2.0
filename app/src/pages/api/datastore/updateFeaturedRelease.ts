// pages/api/updateFeaturedRelease.js

import { Datastore } from "@google-cloud/datastore";

export default async (req, res) => {
  console.log("rea',", req.body);
  try {
    const projectId = "spracto-net-stage"; // Replace with your Google Cloud project ID
    const datastore = new Datastore({ projectId });

    // Query for all entities of kind "featuredRelease"
    const query = datastore.createQuery("featuredRelease");
    const [entities] = await datastore.runQuery(query);

    // Delete existing entities
    const deletePromises = entities.map((entity) =>
      datastore.delete(
        datastore.key(["featuredRelease", entity[datastore.KEY].id])
      )
    );
    await Promise.all(deletePromises);

    // Create a new entity for the "featuredRelease" kind
    const newFeaturedRelease = {
      key: datastore.key("featuredRelease"),
      data: {
        trackId: "1479265036", // Replace with your new track ID
        dlUrl: "https://hypeddit.com/spracto/drop-it-like-its-hot", // Replace with your new download URL
        platform: "soundcloud", // Replace with your new platform
      },
    };

    await datastore.save(newFeaturedRelease);

    res.status(200).json({ message: "Featured release updated successfully" });
  } catch (error) {
    console.error("Error updating featured release:", error);
    res.status(500).json({ error: "Failed to update featured release" });
  }
};
