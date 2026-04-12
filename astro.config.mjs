import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeVintage from 'starlight-theme-vintage';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
  site: 'https://jajera.github.io',
  base: '/s3-files-workloads',
  vite: {
    plugins: [Icons({ compiler: 'astro' })],
  },
  integrations: [
    starlight({
      title: 'S3 Files Workloads',
      favicon: '/favicon.svg',
      description:
        'CLI and Terraform walkthroughs for Amazon S3 Files on EC2, ECS, and Lambda.',
      plugins: [starlightThemeVintage()],
      customCss: ['./src/styles/splash-overrides.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/jajera/s3-files-workloads',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/jajera/s3-files-workloads/edit/main/',
      },
      lastUpdated: true,
      pagination: true,
      sidebar: [
        { label: 'Introduction', link: '/' },
        {
          label: 'CLI',
          collapsed: false,
          items: [
            {
              label: 'EC2',
              collapsed: true,
              items: [
                { slug: 'ec2' },
                {
                  label: 'Setup',
                  collapsed: false,
                  badge: { text: 'Start here', variant: 'tip' },
                  items: [
                    { slug: 'ec2/setup/bucket' },
                    { slug: 'ec2/setup/filesystem' },
                    { slug: 'ec2/setup/mount-targets' },
                    { slug: 'ec2/setup/iam' },
                    { slug: 'ec2/setup/security-groups' },
                  ],
                },
                { slug: 'ec2/install-client' },
                { slug: 'ec2/mount' },
                { slug: 'ec2/verify' },
                { slug: 'ec2/teardown' },
              ],
            },
            {
              label: 'Lambda',
              collapsed: true,
              items: [
                { slug: 'lambda' },
                {
                  label: 'Setup',
                  collapsed: false,
                  badge: { text: 'Start here', variant: 'tip' },
                  items: [
                    { slug: 'lambda/setup/bucket' },
                    { slug: 'lambda/setup/filesystem' },
                    { slug: 'lambda/setup/mount-targets' },
                    { slug: 'lambda/setup/iam' },
                    { slug: 'lambda/setup/security-groups' },
                  ],
                },
                { slug: 'lambda/access-point' },
                { slug: 'lambda/attach' },
                { slug: 'lambda/verify' },
                { slug: 'lambda/teardown' },
              ],
            },
          ],
        },
        {
          label: 'Terraform',
          collapsed: true,
          items: [
            { slug: 'terraform' },
            { slug: 'terraform/ec2' },
            { slug: 'terraform/ecs' },
            { slug: 'terraform/lambda' },
          ],
        },
      ],
    }),
  ],
});
