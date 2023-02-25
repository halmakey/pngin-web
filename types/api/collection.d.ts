import { Collection as ApiCollection } from "@/API";
import { CommonAttributes } from "./common";

export type Collection = Omit<
  ApiCollection,
  CommonAttributes | "Contents" | "Submissions"
>;
