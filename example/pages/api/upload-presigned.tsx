import { NextApiHandler } from "next";
import { apiSignS3Url } from "@netrunnerhq/client";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed" });

  if (!req.query.filename || !req.query.filetype)
    return res.status(400).json({ message: "Missing filename or filetype" });

  try {
    const { filename, filetype } = req.query;
    const { signed_url } = await apiSignS3Url(filename, filetype);
    res.status(200).json({ signed_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export default handler;
