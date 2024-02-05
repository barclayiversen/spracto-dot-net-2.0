// pages/api/datastore/upload.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Storage } from "@google-cloud/storage";
import { Datastore } from "@google-cloud/datastore";
import { IncomingForm } from "formidable";

const gcsProjectId = process.env.GCS_PROJECT_ID;
const datastoreProjectId = process.env.DATASTORE_PROJECT_ID;

const storageOptions = gcsProjectId ? { projectId: gcsProjectId } : {};
const datastoreOptions = datastoreProjectId
  ? { projectId: datastoreProjectId }
  : {};

const storage = new Storage(storageOptions);
const datastore = new Datastore(datastoreOptions);

const bucketName = process.env.BUCKET_NAME;
const kind = "image";

export const config = {
  api: {
    bodyParser: false,
  },
};

const processForm = async (req: NextApiRequest): Promise<formidable.Files> => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Error parsing the form:", err);
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
};

const uploadHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  try {
    const files = await processForm(req);
    const file = files.file[0];

    if (!file) {
      throw new Error("No file uploaded");
    }

    const destinationPath = `PhotoCarousel/${file.originalFilename}`;

    // Check if object exists in the bucket
    const [exists] = await storage
      .bucket(bucketName)
      .file(destinationPath)
      .exists();

    if (exists) {
      // If the file exists, respond with an error or handle accordingly
      res.status(409).json({ error: "File already exists" });
      return;
    }

    // If object doesn't exist, proceed with the upload
    const [fileUploadResponse] = await storage
      .bucket(bucketName)
      .upload(file.filepath, {
        destination: destinationPath,
      });

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${destinationPath}`;

    // Store URL in Datastore
    const entity = {
      key: datastore.key([kind]),
      data: { url: publicUrl },
    };
    await datastore.save(entity);

    res
      .status(200)
      .json({ message: "File uploaded successfully", url: publicUrl });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default uploadHandler;
