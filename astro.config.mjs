import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeVintage from "starlight-theme-vintage";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  site: "https://jajera.github.io",
  base: "/s3-files-workloads",
  vite: {
    plugins: [Icons({ compiler: "astro" })],
  },
  integrations: [
    starlight({
      title: "S3 Files Workloads",
      favicon: "/favicon.svg",
      description: "CLI and Terraform walkthroughs for Amazon S3 Files on EC2, ECS, and Lambda.",
      plugins: [starlightThemeVintage()],
      customCss: ["./src/styles/splash-overrides.css"],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/jajera/s3-files-workloads",
        },
      ],
      editLink: {
        baseUrl: "https://github.com/jajera/s3-files-workloads/edit/main/",
      },
      lastUpdated: true,
      pagination: true,
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "https://jajera.github.io/s3-files-workloads/s3-files-landing-hero.png",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image:alt",
            content: "S3 bucket as NFS file system for EC2, ECS, and Lambda workloads",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "twitter:image",
            content: "https://jajera.github.io/s3-files-workloads/s3-files-landing-hero.png",
          },
        },
        {
          tag: "script",
          attrs: { type: "module" },
          content: `
            const sidebar = document.getElementById('starlight__sidebar');
            if (sidebar) {
              sidebar.addEventListener('toggle', (event) => {
                const opened = event.target;
                if (!(opened instanceof HTMLDetailsElement) || !opened.open) return;

                const item = opened.parentElement;
                const list = item?.parentElement;
                if (!(item instanceof HTMLLIElement) || !(list instanceof HTMLUListElement)) return;

                // Only accordion first-level children under a top-level group (e.g. EC2/Lambda under CLI).
                if (!list.matches('.top-level > li > details > ul')) return;

                for (const sibling of Array.from(list.children)) {
                  if (!(sibling instanceof HTMLLIElement) || sibling === item) continue;
                  const siblingDetails = sibling.querySelector(':scope > details');
                  if (siblingDetails instanceof HTMLDetailsElement) {
                    siblingDetails.open = false;
                  }
                }
              }, true);
            }
          `,
        },
      ],
      sidebar: [
        { label: "Introduction", link: "/" },
        {
          label: "CLI",
          collapsed: false,
          items: [
            {
              label: "EC2",
              collapsed: true,
              items: [
                { slug: "ec2" },
                {
                  label: "Setup",
                  collapsed: false,
                  badge: { text: "Start here", variant: "tip" },
                  items: [
                    { slug: "ec2/setup/bucket" },
                    { slug: "ec2/setup/filesystem" },
                    { slug: "ec2/setup/mount-targets" },
                    { slug: "ec2/setup/iam" },
                    { slug: "ec2/setup/security-groups" },
                  ],
                },
                { slug: "ec2/install-client" },
                { slug: "ec2/mount" },
                { slug: "ec2/verify" },
                { slug: "ec2/teardown" },
              ],
            },
            {
              label: "Lambda",
              collapsed: true,
              items: [
                { slug: "lambda" },
                {
                  label: "Setup",
                  collapsed: false,
                  badge: { text: "Start here", variant: "tip" },
                  items: [
                    { slug: "lambda/setup/bucket" },
                    { slug: "lambda/setup/filesystem" },
                    { slug: "lambda/setup/mount-targets" },
                    { slug: "lambda/setup/iam" },
                    { slug: "lambda/setup/security-groups" },
                  ],
                },
                { slug: "lambda/access-point" },
                { slug: "lambda/attach" },
                { slug: "lambda/verify" },
                { slug: "lambda/teardown" },
              ],
            },
          ],
        },
        {
          label: "Terraform",
          collapsed: true,
          items: [
            { slug: "terraform" },
            { slug: "terraform/ec2" },
            { slug: "terraform/ecs" },
            { slug: "terraform/lambda" },
          ],
        },
      ],
    }),
  ],
});
