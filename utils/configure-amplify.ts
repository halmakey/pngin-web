import { Amplify } from "aws-amplify";
import awsconfig from "@/aws-exports";

let initialized = false;

export async function configureAmplifyOnce() {
  if (!initialized) {
    Amplify.configure({ ...awsconfig, ssr: true });
    initialized = true;
  }
}
