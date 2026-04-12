# Skill: Add a Content Page

Use this skill when the user asks to add a new walkthrough page to the `s3-files-workloads` site.

## Steps

### 1. Determine section and slug

Ask (or infer from context):
- Which section does this page belong to? (`setup`, `ec2`, `eks`, `ecs`, `lambda`, `teardown`)
- What is the page slug (filename without `.mdx`)? e.g. `mount`, `verify`, `iam`

The file path will be: `src/content/docs/<section>/<slug>.mdx`

### 2. Create the `.mdx` file with `draft: true`

Use this frontmatter template exactly:

```mdx
---
title: <Page Title>
description: <One sentence — what does this page achieve?>
draft: true
sidebar:
  label: <Short sidebar label>
---

import { Steps, Aside, Badge } from '@astrojs/starlight/components';
import Checklist from '@/components/Checklist.astro';
import Tooltip from '@/components/Tooltip.astro';

<Checklist
  id="<section>-<slug>"
  items={[
    'Item one',
    'Item two',
  ]}
/>

## Overview

<Steps>

1. **Step one.** <Badge text="Required" variant="tip" size="small" />

   ```bash frame="terminal"
   # command here
   ```

</Steps>
```

Rules:
- `id` in `<Checklist>` must be unique across the whole site. Pattern: `<section>-<slug>`.
- All block JSX inside `<Steps>` must be indented 3 spaces; `<TabItem>` contents 6 spaces.
- Only import what the page actually uses.

### 3. Check and update `src/data/glossary.ts`

If the page introduces new AWS or S3 Files terms, add them to `src/data/glossary.ts` in alphabetical order by key:

```ts
'new-term': 'New Term — one-sentence definition.',
```

Then use `<Tooltip term="new-term" />` on the page instead of defining the term inline.

### 4. Do NOT add to sidebar yet

Do not touch `astro.config.mjs` until the page is ready to publish (content complete, `draft: true` removed).

The draft page will be visible at `http://localhost:4321/s3-files-workloads/<section>/<slug>/` during `npm run dev` but excluded from production builds.

### 5. Publishing checklist

When the page content is complete:

1. Remove `draft: true` from the frontmatter.
2. Open `astro.config.mjs` and add the slug to the correct section's `items` array:
   ```js
   { slug: '<section>/<slug>' },
   ```
3. If the section group did not exist in the sidebar yet, add the whole group block.
4. Run `npm run build` to confirm no build errors before committing.

## Example: adding `ec2/verify.mdx`

File path: `src/content/docs/ec2/verify.mdx`

```mdx
---
title: Verify EC2 Mount
description: Confirm the S3 file system is mounted and read/write operations work on EC2.
draft: true
sidebar:
  label: Verify
---

import { Steps, Aside } from '@astrojs/starlight/components';
import Checklist from '@/components/Checklist.astro';

<Checklist
  id="ec2-verify"
  items={[
    'Mount confirmed with df and findmnt',
    'Read test passed',
    'Write test passed and synced to S3',
  ]}
/>

## Overview

<Steps>

1. **Check the mount.**

   ```bash frame="terminal"
   df -h /mnt/s3files
   findmnt -T /mnt/s3files
   ```

2. **Write a file and verify sync.**

   ```bash frame="terminal"
   echo "hello from ec2" > /mnt/s3files/test.txt
   cat /mnt/s3files/test.txt
   aws s3 ls s3://$BUCKET/ --region $AWS_REGION
   ```

</Steps>
```
