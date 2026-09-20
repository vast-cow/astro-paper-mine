import { defineAstroPaperConfig } from "./src/types/config";

const githubOwner = process.env.GITHUB_REPOSITORY_OWNER || "local-author";
const githubServerUrl = process.env.GITHUB_SERVER_URL || "https://github.com";
const githubRepository = process.env.GITHUB_REPOSITORY || `${githubOwner}/blog`;
const githubRef = process.env.GITHUB_REF_NAME || "main";
const siteUrl = process.env.SITE_URL || "http://localhost:4321";
const githubProfile = `${githubServerUrl}/${githubOwner}`;

export default defineAstroPaperConfig({
  site: {
    url: siteUrl,
    title: `${githubOwner}'s blog`,
    description: "Notes, ideas, and things I learn along the way.",
    author: githubOwner,
    profile: githubProfile,
    lang: "en",
    timezone: "Etc/UTC",
    dir: "ltr",
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
    { name: "github", url: githubProfile },
  ],
  shareLinks: [
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
