import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://vast-cow.github.io/",
    title: "vast-cow's blog",
    description: "Notes, ideas, and things I learn along the way.",
    author: "vast-cow",
    profile: "https://github.com/vast-cow",
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
      url: "https://github.com/vast-cow/vast-cow.github.io/edit/main/",
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/vast-cow" },
  ],
  shareLinks: [
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
