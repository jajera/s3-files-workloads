import * as fc from "fast-check";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getAllMdxFiles, getHeadingLevels, splitFrontmatter } from "../helpers/mdx";

describe("Feature: s3-files-workloads, Property 2: Heading hierarchy validity", () => {
  const files = getAllMdxFiles();

  it("no MDX file skips heading levels", () => {
    fc.assert(
      fc.property(fc.constantFrom(...files), (filePath) => {
        const parts = splitFrontmatter(readFileSync(filePath, "utf-8"));
        expect(parts).not.toBeNull();
        const levels = getHeadingLevels(parts!.body);
        for (let i = 1; i < levels.length; i++) {
          expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
        }
      }),
      { numRuns: Math.max(100, files.length) }
    );
  });
});
