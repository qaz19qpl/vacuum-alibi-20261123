// The Vacuum's Alibi: One Line, 200 Characters
// Writes the robot vacuum's one-line excuse for missing a spot to /output/entry.txt
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";

const LINE =
  "That spot isn't missed — it's under investigation: my sensors logged the cat there at 3 a.m., and I refuse to disturb a crime scene.";

if (LINE.length > 200) {
  throw new Error(`entry is ${LINE.length} characters, over the 200 limit`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be blank");
}
if (LINE.includes("\n")) {
  throw new Error("entry must be a single line");
}
if (/[\u0000-\u001f\u007f]/.test(LINE)) {
  throw new Error("entry must not contain control characters");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");
chmodSync("/output/entry.txt", 0o644);
console.log(`Wrote ${LINE.length} characters to /output/entry.txt`);
