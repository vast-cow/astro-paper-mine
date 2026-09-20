import { defineAstroPaperConfig } from "./src/types/config";

const author = process.env.ASTRO_AUTHOR || "local-author";
const githubRepository = process.env.GITHUB_REPOSITORY || `${author}/blog`;
const siteUrl = process.env.SITE_URL || "http://localhost:4321";
const editPostUrl =
  process.env.ASTRO_EDIT_POST_URL ||
  `https://github.com/${githubRepository}/edit/deploy/`;
const profileUrl =
  process.env.ASTRO_PROFILE_URL || `https://github.com/${author}`;

export default defineAstroPaperConfig({
  site: {
    url: siteUrl,
    title: `${author}'s blog`,
    description: "Notes, ideas, and things I learn along the way.",
    author,
    profile: profileUrl,
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
      url: editPostUrl,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: profileUrl },
  ],
  shareLinks: [
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
