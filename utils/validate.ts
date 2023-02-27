export function validateString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}
