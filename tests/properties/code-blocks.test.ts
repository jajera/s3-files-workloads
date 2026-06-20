import * as fc from "fast-check";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getAllMdxFiles, getFencedCodeBlocks, splitFrontmatter } from "../helpers/mdx";

describe("Feature: s3-files-workloads, Property 3: Code block language identifiers", () => {
  const files = getAllMdxFiles();

  it("all fenced code blocks include a language identifier", () => {
    fc.assert(
      fc.property(fc.constantFrom(...files), (filePath) => {
        const parts = splitFrontmatter(readFileSync(filePath, "utf-8"));
        expect(parts).not.toBeNull();
        const languages = getFencedCodeBlocks(parts!.body);
        for (const lang of languages) {
          expect(lang.trim().length).toBeGreaterThan(0);
        }
      }),
      { numRuns: Math.max(100, files.length) }
    );
  });
});
