import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

const legacyContentDir = path.join(process.cwd(), "legacy-content");

export const loadLegacyHtml = cache((fileName: string) => {
  const filePath = path.join(legacyContentDir, fileName);
  return fs.readFileSync(filePath, "utf8");
});
