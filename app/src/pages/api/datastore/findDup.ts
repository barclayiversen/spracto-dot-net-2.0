const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore();

async function findAndDeleteDuplicateUrls() {
  const kind = "image";
  const query = datastore.createQuery(kind);
  const [entities] = await datastore.runQuery(query);

  const urlMap = new Map();

  // Group entities by URL
  entities.forEach((entity) => {
    const url = entity.url;
    const entityKey = entity[datastore.KEY];

    if (!urlMap.has(url)) {
      urlMap.set(url, []);
    }
    urlMap.get(url).push(entityKey);
  });

  // Filter out URLs with duplicates and prepare for deletion
  const duplicateEntityKeys = Array.from(urlMap)
    .filter(([url, keys]) => keys.length > 1)
    .flatMap(([url, keys]) => keys.slice(1)); // Keep one entity, slice the rest

  // Perform deletion
  for (const key of duplicateEntityKeys) {
    await datastore.delete(key);
    console.log(`Deleted duplicate entity with key: ${key.path.join("/")}`);
  }

  console.log("Duplicate deletion process completed.");
}

findAndDeleteDuplicateUrls().catch(console.error);
