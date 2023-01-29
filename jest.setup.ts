import { loadEnvConfig } from "@next/env";

export default async function setup() {
  loadEnvConfig(process.cwd());
}
