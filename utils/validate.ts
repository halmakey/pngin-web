export function validateString(
  value: unknown,
  min: number = 0,
  max: number = 4096
): string | undefined {
  return typeof value === "string" && value.length >= min && value.length <= max
    ? value
    : undefined;
}

export function validateNanoID(value: unknown): string | undefined {
  return validateString(value, 4, 40);
}
