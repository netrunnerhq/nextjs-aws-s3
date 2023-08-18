import { demo } from "../dist/index.mjs";

const successMessage = () =>
  console.log("\x1b[32m", "All tests passed!", "\x1b[0m");

function testDemo() {
  const result = demo(1, 2);
  const expected = 3;
  if (result !== expected) {
    throw new Error(`${result} is not equal to ${expected}`);
  } else {
    return true;
  }
}

function main() {
  const t1 = testDemo();
  const t2 = true;

  if (t1 && t2) return successMessage();
}

main();
