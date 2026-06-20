# s3-files-workloads

[![Deploy](https://github.com/jajera/s3-files-workloads/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/jajera/s3-files-workloads/actions/workflows/deploy.yml)

Documentation for [Amazon S3 Files](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-files.html) — **CLI walkthroughs** (EC2 and Lambda) and **Terraform examples** (EC2, ECS Fargate, Lambda), copy-paste first.

## What this is

An [Astro Starlight](https://starlight.astro.build/) site with per-platform guides: each CLI section includes its own setup (bucket through security groups), mount or attach steps, verify, and teardown. Terraform pages describe the [`terraform-aws-s3-files`](https://github.com/jajera/terraform-aws-s3-files) examples.

| Area             | Contents                                                              |
| ---------------- | --------------------------------------------------------------------- |
| **Introduction** | Prerequisites (versioning, SSE, IAM, NFS, CLI and Terraform versions) |
| **CLI → EC2**    | Setup → launch & install → mount → verify → teardown                  |
| **CLI → Lambda** | Setup → access point → attach → verify → teardown                     |
| **Terraform**    | EC2, ECS Fargate, Lambda examples (`terraform apply`)                 |

## Key facts

- CLI namespace: `aws s3files` (not `aws s3` or `aws efs`); **AWS CLI v2.34.26+**
- Mount type: `-t s3files`
- **Two IAM roles**: file system role (`elasticfilesystem.amazonaws.com`) + compute role
- Bucket **versioning** required; **SSE-S3 or SSE-KMS** only (not SSE-C)
- ECS: **Fargate or Managed Instances only** (EC2 launch type not supported)
- Lambda: **access point required**

## Quick start

Use Node **22** (see `.nvmrc`; `package.json` engines allow ≥ 18.20.8).

```bash
npm install
npm run dev
```

Open the URL the dev server prints (with `base: '/s3-files-workloads'`, typically `http://localhost:4321/s3-files-workloads/`).

```bash
npm run build   # production build (draft pages excluded)
npm run preview # serve the build locally
```

## Deploy

GitHub Pages on push to `main` via [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

1. Repo **Settings → Pages**: **Source** = **GitHub Actions**
2. `astro.config.mjs`: `site` and `base` (`/s3-files-workloads`) must match the Pages URL

## Project structure

```plaintext
src/content/docs/
  index.mdx              # Introduction
  ec2/                   # overview, setup/*, install-client, mount, verify, teardown
  lambda/                # overview, setup/*, access-point, attach, verify, teardown
  terraform/             # overview + ec2, ecs, lambda example pages
src/components/          # Checklist, Tooltip, etc.
src/data/glossary.ts     # tooltip terms
src/styles/              # theme overrides (e.g. content width, tables)
```

## Reference

- [Amazon S3 Files User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-files.html)
- [AWS CLI s3files reference](https://docs.aws.amazon.com/cli/latest/reference/s3files/index.html)
- [aws-eks-walkthrough](https://github.com/jajera/aws-eks-walkthrough) — sibling repo (Starlight layout and CI patterns)
