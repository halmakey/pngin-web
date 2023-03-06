#!/usr/bin/env -S npx tsx

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import * as Collection from "@/models/Collection";
import { nanoid } from "nanoid";

async function main() {
  const allCollection = await Collection.listAllCollection();

  const nextNumber = allCollection.length + 1;
  const now = new Date();
  const collection = await Collection.createCollection({
    id: `collection-${nanoid()}`,
    name: `TEST COLLECTION ${nextNumber}`,
    sequence: nextNumber,
    startCallAt: now.toISOString(),
    endCallAt: new Date(now.valueOf() + 1000 * 60 * 60 * 24).toISOString(),
  });

  console.log(JSON.stringify(collection, undefined, 2));
}

main();
