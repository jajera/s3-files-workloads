import * as fc from "fast-check";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getAllMdxFiles, parseFrontmatterField, splitFrontmatter } from "../helpers/mdx";

describe("Feature: s3-files-workloads, Property 1: Frontmatter validity", () => {
  const files = getAllMdxFiles();

  it("all MDX files have non-empty title and description", () => {
    fc.assert(
      fc.property(fc.constantFrom(...files), (filePath) => {
        const parts = splitFrontmatter(readFileSync(filePath, "utf-8"));
        expect(parts).not.toBeNull();
        const title = parseFrontmatterField(parts!.frontmatter, "title");
        const description = parseFrontmatterField(parts!.frontmatter, "description");
        expect(title?.trim().length).toBeGreaterThan(0);
        expect(description?.trim().length).toBeGreaterThan(0);
      }),
      { numRuns: Math.max(100, files.length) }
    );
  });
});
