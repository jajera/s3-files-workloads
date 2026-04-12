# Agent Context

Astro Starlight documentation site for **Amazon S3 Files**, organized as CLI-first walkthroughs for every supported compute target.

## What this repo is

`s3-files-workloads` contains hands-on, copy-paste CLI walkthroughs for [Amazon S3 Files](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-files.html) — the AWS service that mounts an S3 bucket as an NFS file system on EC2, EKS, ECS (Fargate), and Lambda.

Each section walks through:

1. Shared setup — [Setup prerequisites](/s3-files-workloads/setup/#prerequisites) (AWS CLI + **file system IAM role** per [AWS](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-files-prereq-policies.html#s3-files-prereq-iam-creation-role)), then bucket, file system, mount targets, **compute** IAM, security groups
2. Platform-specific mount and verify steps

## Key S3 Files facts (agents must know these)

### CLI namespace

S3 Files uses `aws s3files` — **not** `aws s3` or `aws efs`. Requires **AWS CLI v2.34.26 or newer**; **v2.34.23 and earlier** omit `s3files` (`Found invalid choice 's3files'`). Legacy **AWS CLI v1** (`pip install awscli`) never includes `s3files`. Document the floor in setup Prerequisites (`src/content/docs/setup/index.mdx`).

```bash
aws s3files create-file-system ...
aws s3files list-file-systems ...
aws s3files get-file-system ...
aws s3files create-mount-target ...
aws s3files list-mount-targets ...
aws s3files create-access-point ...
```

Read and wait operations use **`list-*`** and **`get-*`**, not `describe-*` (unlike classic EFS/EC2-style APIs). See the [AWS CLI `s3files` reference](https://docs.aws.amazon.com/cli/latest/reference/s3files/index.html).

### Mount type

Always `-t s3files`, not `-t nfs4`:

```bash
sudo mount -t s3files $FS_ID:/ /mnt/s3files
```

### Two IAM roles (both required)

| Role | Service principal | Purpose |
| ---- | ---------------- | ------- |
| File system role | `elasticfilesystem.amazonaws.com` | S3 Files reads/writes S3 bucket + manages EventBridge sync |
| Compute role | EC2 instance profile / ECS task role / Lambda exec role | Compute mounts file system and reads objects directly |

### Bucket prerequisites

- **Versioning must be enabled** — required for sync
- **Only SSE-S3 or SSE-KMS** — SSE-C not supported

### Per-platform constraints

| Platform | Constraint |
| -------- | ---------- |
| EC2 | Requires `amazon-efs-utils` v3.0.0+ |
| EKS | Uses Amazon EFS CSI driver (`aws-efs-csi-driver`) |
| ECS | **Fargate and Managed Instances only — EC2 launch type not supported** |
| Lambda | **Access point required** — cannot mount by file system ID alone |

### Security group port

NFS port **2049 TCP** between compute SG and mount target SG.

## Site structure

```plaintext
src/content/docs/
  index.mdx         # splash page
  setup/            # shared: bucket, filesystem, mount-targets, iam, security-groups
  ec2/              # install-client (launch EC2 + client), mount, verify
  eks/              # efs-csi-driver, static-provisioning, verify
  ecs/              # task-definition, run-task
  lambda/           # access-point, attach, verify
  teardown/         # cleanup everything
```

## Tech stack

- Astro + `@astrojs/starlight` + `starlight-theme-vintage`
- `unplugin-icons` for brand icons (mdi, simple-icons)
- Node 22 (`.nvmrc`)
- GitHub Actions: deploy to GitHub Pages on push to `main`

## Site config

- `site: 'https://jajera.github.io'`
- `base: '/s3-files-workloads'`
- All internal links must include the base path, e.g. `/s3-files-workloads/setup/`

## Default AWS region

Always use `ap-southeast-6` in all examples and CLI commands.

## Draft/publish workflow

1. New pages are created with `draft: true` in frontmatter.
2. Draft pages are visible in `npm run dev` but excluded from `npm run build`.
3. Do **not** add a draft page's slug to `astro.config.mjs` sidebar — it will break the build.
4. To publish: remove `draft: true`, then add the slug to the sidebar in `astro.config.mjs`.

## Conventions

Follow `.cursor/rules/` for detailed guidance:

- `docs-pattern.mdc` — page structure, frontmatter, MDX indentation rules
- `astro-components.mdc` — which component to use when
- `s3files-conventions.mdc` — S3 Files-specific CLI patterns and constraints
- `glossary.mdc` — alphabetical order for `src/data/glossary.ts`
- `markdown-tables.mdc` — spaced separator rows required

## Sibling repos

- [`aws-eks-walkthrough`](https://github.com/jajera/aws-eks-walkthrough) — pattern reference for Astro Starlight structure, components, and CI
