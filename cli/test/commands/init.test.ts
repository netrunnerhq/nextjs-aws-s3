import { expect, test } from "@oclif/test";
import * as fs from "fs/promises";
import * as path from "path";
import Init from "../../src/commands/init";
import {
  API_FILE_NAME,
  API_DIR_PATH,
  PAGES_FILE_NAME,
  PAGES_DIR_PATH,
} from "../../src/constants/file-names";
import { cleanupTestFiles } from "./clean-up";
import { TEST_USER_ID } from "../../src/constants";

describe("Init command", () => {
  test.it("exports the Init command", () => {
    expect(Init).to.not.be.undefined;
  });

  it("executes without throwing an error", async () => {
    await cleanupTestFiles();

    // Call the run() function within a try-catch block.
    try {
      // execute the Init command
      await Init.run([TEST_USER_ID]);
      // If no error is thrown, the test will pass.
    } catch (error) {
      // If an error is thrown, fail the test.
      throw new Error(`The Init command threw an error: ${error}`);
    }
  });

  test.it("creates new files and logs their paths", async () => {
    const apiFilePath = path.join(process.cwd(), API_DIR_PATH, API_FILE_NAME);
    const pagesFilePath = path.join(
      process.cwd(),
      PAGES_DIR_PATH,
      PAGES_FILE_NAME
    );

    expect(await fs.access(apiFilePath)).to.not.throw;
    expect(await fs.access(pagesFilePath)).to.not.throw;

    // Clean up the test files after the test
    // await cleanupTestFiles();
  });
});
