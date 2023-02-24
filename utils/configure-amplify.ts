import { Amplify, DataStore, Predicates, syncExpression } from "aws-amplify";
import awsconfig from "@/aws-exports";

let initialized = false;

export async function getDataStore() {
  if (!initialized) {
    Amplify.configure(awsconfig);
    DataStore.configure();
    initialized = true;
  }
  await DataStore.stop();
  await DataStore.start();
  return DataStore;
}
