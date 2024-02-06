import { Datastore } from "@google-cloud/datastore";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const projectId = process.env.DATASTORE_PROJECT_ID;
    const datastore = new Datastore({ projectId });

    const transaction = datastore.transaction();
    await transaction.run();

    try {
      // Query for all entities of kind "featuredRelease"
      const query = datastore.createQuery("featuredRelease");
      const [entities] = await transaction.runQuery(query);

      console.log(`Found ${entities.length} entities to delete.`);

      // Check if entities are found
      if (entities.length === 0) {
        console.log("No existing entities found to delete.");
      }

      // Delete existing entities by ID
      for (const entity of entities) {
        const entityId = entity[datastore.KEY].id;
        const entityKey = datastore.key([
          "featuredRelease",
          parseInt(entityId),
        ]);
        console.log(`Deleting entity with ID: ${entityId}`);
        await transaction.delete(entityKey);
      }

      // Create a new entity for the "featuredRelease" kind
      const newFeaturedRelease = {
        key: datastore.key("featuredRelease"),
        data: {
          trackId: req.body.trackId,
          dlUrl: req.body.dlUrl,
          platform: req.body.platform,
        },
      };

      console.log(
        `Adding new featured release: ${JSON.stringify(newFeaturedRelease)}`
      );
      await transaction.save(newFeaturedRelease);

      // Commit the transaction
      await transaction.commit();

      res
        .status(200)
        .json({ message: "Featured release updated successfully" });
    } catch (error) {
      // Rollback the transaction in case of an error
      await transaction.rollback();
      console.error("Transaction failed:", error);
      res.status(500).json({ error: "Failed to update featured release" });
    }
  } catch (error) {
    console.error("Error updating featured release:", error);
    res.status(500).json({ error: "Failed to update featured release" });
  }
};
