export function validateStringInput(input: string | string[]): string {
  // convert string of arrays or string to string / used in apiSignS3Url
  if (!input) {
    throw new Error("Input cannot be empty");
  } else if (Array.isArray(input)) {
    return input.join(",");
  } else {
    return input;
  }
}
