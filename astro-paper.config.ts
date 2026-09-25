import { defineAstroPaperConfig } from "./src/types/config";

const author = process.env.ASTRO_AUTHOR || "local-author";
const githubRepository = process.env.GITHUB_REPOSITORY || `${author}/blog`;
const editPostUrl =
  process.env.ASTRO_EDIT_POST_URL ||
  `https://github.com/${githubRepository}/edit/posts/posts/`;
const profileUrl =
  process.env.ASTRO_PROFILE_URL || `https://github.com/${author}`;
const siteUrl = process.env.SITE_URL || "http://localhost:4321";

type BlogLang = "en" | "ja";

const rawLang = process.env.BLOG_LANG ?? "en";

if (rawLang !== "en" && rawLang !== "ja") {
  throw new Error(
    `Unsupported BLOG_LANG: ${rawLang}. Expected "en" or "ja".`
  );
}

const lang: BlogLang = rawLang;
const localized = {
  en: {
    title: `${author}'s blog`,
    description: "Notes, ideas, and things I learn along the way.",
    timezone: "Etc/UTC",
    githubTitle: `${author}'s GitHub profile`,
    xTitle: "Share this post on X",
    facebookTitle: "Share this post on Facebook",
    mailTitle: "Share this post via email",
    mailUrl: "mailto:?subject=See%20this%20post&body=",
  },
  ja: {
    title: `${author}のブログ`,
    description: "日々の学びや考えたことを日本語で記録するブログです。",
    timezone: "Asia/Tokyo",
    githubTitle: `${author}のGitHubプロフィール`,
    xTitle: "この記事をXで共有",
    facebookTitle: "この記事をFacebookで共有",
    mailTitle: "この記事をメールで共有",
    mailUrl:
      "mailto:?subject=%E3%81%93%E3%81%AE%E8%A8%98%E4%BA%8B%E3%82%92%E3%81%94%E8%A6%A7%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84&body=",
  },
}[lang];

export default defineAstroPaperConfig({
  site: {
    url: siteUrl,
    title: localized.title,
    description: localized.description,
    author,
    profile: profileUrl,
    lang,
    timezone: localized.timezone,
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
    {
      name: "github",
      url: profileUrl,
      linkTitle: localized.githubTitle,
    },
  ],
  shareLinks: [
    {
      name: "x",
      url: "https://x.com/intent/post?url=",
      linkTitle: localized.xTitle,
    },
    {
      name: "facebook",
      url: "https://www.facebook.com/sharer.php?u=",
      linkTitle: localized.facebookTitle,
    },
    {
      name: "mail",
      url: localized.mailUrl,
      linkTitle: localized.mailTitle,
    },
  ],
});
