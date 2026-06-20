import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

export const DOCS_DIR = join(process.cwd(), "src/content/docs");

export function getAllMdxFiles(dir = DOCS_DIR): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      files.push(...getAllMdxFiles(fullPath));
    } else if (entry.endsWith(".mdx")) {
      files.push(fullPath);
    }
  }
  return files;
}

export function slugFromPath(filePath: string): string {
  const rel = relative(DOCS_DIR, filePath).replace(/\.mdx$/, "");
  return rel;
}

export function splitFrontmatter(content: string): {
  frontmatter: string;
  body: string;
} | null {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;
  return { frontmatter: match[1], body: match[2] };
}

export function parseFrontmatterField(frontmatter: string, field: string): string | undefined {
  const line = frontmatter.split("\n").find((l) => l.startsWith(`${field}:`));
  if (!line) return undefined;
  const value = line.slice(field.length + 1).trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

export function getHeadingLevels(body: string): number[] {
  const levels: number[] = [];
  const lines = body.split("\n");
  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s/);
    if (match) levels.push(match[1].length);
  }
  return levels;
}

export function getFencedCodeBlocks(body: string): string[] {
  const blocks: string[] = [];
  const regex = /^```([^\n]*)\n([\s\S]*?)^```/gm;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(body)) !== null) {
    blocks.push(match[1]);
  }
  return blocks;
}

export function mdxPathForSlug(slug: string): string {
  return join(DOCS_DIR, `${slug}.mdx`);
}

export function slugFileExists(slug: string): boolean {
  return existsSync(mdxPathForSlug(slug));
}

export function readMdxBySlug(slug: string): string {
  return readFileSync(mdxPathForSlug(slug), "utf-8");
}
