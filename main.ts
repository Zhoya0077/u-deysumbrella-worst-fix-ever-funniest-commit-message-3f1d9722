// Worst Fix Ever: Funniest Commit Message — program/v1.
// Writes one commit message to $MAKEFUN_OUTPUT_DIR/entry.txt and prints it.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "fix: prevent data loss by never saving anything again";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(ENTRY);

// Self-checking gate: the file must exist, hold 1-100 non-whitespace
// characters on a single line, and match exactly what was printed.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  console.error("gate failed: entry.txt does not match the printed line");
  process.exit(1);
}
if (written.length < 1 || written.length > 100) {
  console.error(`gate failed: entry is ${written.length} chars, must be 1-100`);
  process.exit(1);
}
if (written.trim().length === 0 || written.includes("\n")) {
  console.error("gate failed: entry must be one non-blank line");
  process.exit(1);
}
