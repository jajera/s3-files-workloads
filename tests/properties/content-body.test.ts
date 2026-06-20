import * as fc from "fast-check";
import { describe, expect, it } from "vitest";
import { REQUIRED_SLUGS } from "../fixtures/required-slugs";
import { readMdxBySlug, splitFrontmatter } from "../helpers/mdx";

describe("Feature: s3-files-workloads, Property 5: Non-empty page body", () => {
  it("every required page has non-empty content after frontmatter", () => {
    fc.assert(
      fc.property(fc.constantFrom(...REQUIRED_SLUGS), (slug) => {
        const parts = splitFrontmatter(readMdxBySlug(slug));
        expect(parts).not.toBeNull();
        expect(parts!.body.trim().length).toBeGreaterThan(0);
      }),
      { numRuns: Math.max(100, REQUIRED_SLUGS.length) }
    );
  });
});
