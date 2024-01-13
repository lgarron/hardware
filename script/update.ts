import { cp, readFile, rename, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { Glob } from "bun";

const mainDir = new URL("../worktrees/main", import.meta.url).pathname;

await rm(mainDir, { recursive: true });
await cp(
  "/Users/lgarron/Library/Mobile Documents/iCloud~md~obsidian/Documents/Notes/Reference/Hardware",
  mainDir,
  { recursive: true },
);

function translateSizedImageSyntax(s: string): string {
  return s
    .replaceAll(
      /\!\[(.*)\\?\|(.*)\]\((.*)\)/g,
      `<img alt="$1" width="$2" src="$3">`,
    )
    .replaceAll(/\!\[(.*)\]\((.*)\)/g, `<img alt="$1" src="$2">`);
}

await rename(join(mainDir, "Hardware (Index).md"), join(mainDir, "README.md"));

const markdownFiles = new Glob("**/*.md").scan({
  cwd: mainDir,
  absolute: true,
});
for await (const markdownFile of markdownFiles) {
  const contents = await readFile(markdownFile, "utf-8");
  await writeFile(markdownFile, translateSizedImageSyntax(contents));
}

await writeFile(
  join(mainDir, ".git"),
  "gitdir: /Users/lgarron/Code/git/github.com/lgarron/hardware/worktrees/checkout/.git/worktrees/main",
);
