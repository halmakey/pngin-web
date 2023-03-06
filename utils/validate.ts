export function validateString(
  value: unknown,
  min: number = 0,
  max: number = 4096
): string | undefined {
  return typeof value === "string" && value.length >= min && value.length <= max
    ? value
    : undefined;
}
