// pages/api/datastore/upload.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Storage } from "@google-cloud/storage";
import { Datastore } from "@google-cloud/datastore";
import { IncomingForm } from "formidable";

// Replace with your GCS and Datastore project names
const gcsProjectId = process.env.GCS_PROJECT_ID;
const datastoreProjectId = process.env.DATASTORE_PROJECT_ID;

const storageOptions = gcsProjectId ? { projectId: gcsProjectId } : {};
const datastoreOptions = datastoreProjectId
  ? { projectId: datastoreProjectId }
  : {};

const storage = new Storage(storageOptions); // Initialize GCS client with project ID
const datastore = new Datastore(datastoreOptions); // Initialize Datastore client with project ID

const bucketName = process.env.BUCKET_NAME; // Replace with your GCS bucket name
const kind = "image"; // The kind for the Datastore

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
        resolve(files); // Resolve with the files
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
    // Process the file upload
    const files = await processForm(req);
    const file = files.file[0]; // Accessing the first element of the array

    if (!file) {
      throw new Error("No file uploaded");
    }

    const destinationPath = `PhotoCarousel/${file.originalFilename}`;
    const [fileUploadResponse] = await storage
      .bucket(bucketName)
      .upload(file.filepath, {
        destination: destinationPath,
      });

    // Get public URL for the file
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${destinationPath}`;

    // Store URL in Datastore
    const entity = {
      key: datastore.key([kind]),
      data: {
        url: publicUrl,
      },
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
