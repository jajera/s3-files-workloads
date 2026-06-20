import { execSync } from "node:child_process";

const checks = [
  {
    label: "prettier",
    command: "npx prettier --check .",
  },
  {
    label: "markdownlint",
    command: 'npx markdownlint-cli2 "src/**/*.mdx"',
  },
] as const;

const failures: string[] = [];

for (const check of checks) {
  try {
    execSync(check.command, { stdio: "pipe", encoding: "utf-8" });
    console.log(`[${check.label}] passed`);
  } catch (error) {
    const err = error as { stdout?: string; stderr?: string; message?: string };
    failures.push(`[${check.label}] failed`);
    if (err.stdout) console.error(err.stdout);
    if (err.stderr) console.error(err.stderr);
    if (!err.stdout && !err.stderr) console.error(err.message);
  }
}

if (failures.length > 0) {
  console.error(`Validation failed: ${failures.join(", ")}`);
  process.exit(1);
}

console.log("All validation checks passed");
