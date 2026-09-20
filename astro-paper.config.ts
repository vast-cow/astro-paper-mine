import { defineAstroPaperConfig } from "./src/types/config";

const githubOwner = process.env.GITHUB_REPOSITORY_OWNER || "local-author";
const githubServerUrl = process.env.GITHUB_SERVER_URL || "https://github.com";
const githubRepository = process.env.GITHUB_REPOSITORY || `${githubOwner}/blog`;
const githubRef = process.env.GITHUB_REF_NAME || "deploy";
const siteUrl = process.env.SITE_URL || "http://localhost:4321";
const githubProfile = `${githubServerUrl}/${githubOwner}`;

export default defineAstroPaperConfig({
  site: {
    url: siteUrl,
    title: `${githubOwner}のブログ`,
    description: "日々の学びや考えたことを日本語で記録するブログです。",
    author: githubOwner,
    profile: githubProfile,
    ogImage: "default-og.jpg",
    lang: "ja",
    timezone: "Asia/Tokyo",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: `${githubServerUrl}/${githubRepository}/edit/${githubRef}/`,
    },
    search: "pagefind",
  },
  socials: [
    {
      name: "github",
      url: githubProfile,
      linkTitle: `${githubOwner}のGitHubプロフィール`,
    },
  ],
  shareLinks: [
    {
      name: "x",
      url: "https://x.com/intent/post?url=",
      linkTitle: "この記事をXで共有",
    },
    {
      name: "facebook",
      url: "https://www.facebook.com/sharer.php?u=",
      linkTitle: "この記事をFacebookで共有",
    },
    {
      name: "mail",
      url: "mailto:?subject=%E3%81%93%E3%81%AE%E8%A8%98%E4%BA%8B%E3%82%92%E3%81%94%E8%A6%A7%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84&body=",
      linkTitle: "この記事をメールで共有",
    },
  ],
});
