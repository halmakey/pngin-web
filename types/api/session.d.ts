import { Session as ApiSession } from "@/API";
import { CommonAttributes } from "./common";

export type Session = Omit<
  ApiSession,
  CommonAttributes
>;
