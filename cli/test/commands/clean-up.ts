import * as fs from "fs/promises";
import * as path from "path";
import chalk from "chalk";
import { API_DIR_PATH, PAGES_DIR_PATH } from "../../src/constants/file-names";

export async function cleanupTestFiles() {
  // Clean up any existing test files
  let pagesExist = false;
  let apiExist = false;
  try {
    await fs.access(path.join(process.cwd(), PAGES_DIR_PATH));
    pagesExist = true;
  } catch {}

  try {
    await fs.access(path.join(process.cwd(), API_DIR_PATH));
    apiExist = true;
  } catch {}

  if (pagesExist || apiExist) {
    console.log(
      "\n  " +
        chalk.magenta("pages/api directory deleted") +
        (pagesExist ? `, ${chalk.magenta("pages directory deleted\n")}` : "")
    );
  }

  if (pagesExist) {
    await fs.rm(path.join(process.cwd(), PAGES_DIR_PATH), {
      recursive: true,
      force: true,
    });
  }

  if (apiExist) {
    await fs.rm(path.join(process.cwd(), API_DIR_PATH), {
      recursive: true,
      force: true,
    });
  }
}
