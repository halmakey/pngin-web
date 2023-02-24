import "@/utils/configure-amplify";
import { Collection } from "@/models";
import { DataStore, Predicates } from "aws-amplify";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getActiveCollections(req, res);
  }
}

async function getActiveCollections(
  req: NextApiRequest,
  res: NextApiResponse<Collection[]>
) {
  const collections = await DataStore.query(Collection, (c) =>
    c.startCallAt.le(new Date().toISOString())
  );
  res.json(collections);
}
