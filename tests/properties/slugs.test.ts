import * as fc from "fast-check";
import { describe, expect, it } from "vitest";
import { REQUIRED_SLUGS } from "../fixtures/required-slugs";
import { slugFileExists } from "../helpers/mdx";

describe("Feature: s3-files-workloads, Property 4: Slug-to-file correspondence", () => {
  it("every required slug has a corresponding MDX file", () => {
    fc.assert(
      fc.property(fc.constantFrom(...REQUIRED_SLUGS), (slug) => {
        expect(slugFileExists(slug)).toBe(true);
      }),
      { numRuns: Math.max(100, REQUIRED_SLUGS.length) }
    );
  });
});
