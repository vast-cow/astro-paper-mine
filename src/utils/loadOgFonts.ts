import { readFile } from "node:fs/promises";
import path from "node:path";
import { experimental_getFontFileURL, fontData } from "astro:assets";
import config from "@/config";
import { getFontPathByWeight } from "@/utils/getFontPathByWeight";

const fontDirectory = process.env.OG_FONT_DIR ?? ".cache/og-fonts";

async function loadLocalFont(filename: string): Promise<Buffer> {
  const fontPath = path.resolve(fontDirectory, filename);

  try {
    return await readFile(fontPath);
  } catch (error) {
    throw new Error(
      `Unable to load the OG image font at ${fontPath}. Run scripts/download-og-fonts.sh before building the site.`,
      { cause: error }
    );
  }
}

async function loadEnglishOgFonts(url: URL) {
  const fonts = fontData["--font-google-sans-code"];
  const regularFontPath = getFontPathByWeight(fonts, 400);
  const boldFontPath = getFontPathByWeight(fonts, 700);

  if (regularFontPath === undefined || boldFontPath === undefined) {
    throw new Error("Cannot find the Google Sans Code font path.");
  }

  const [regular, bold] = await Promise.all([
    fetch(experimental_getFontFileURL(regularFontPath, url)).then(response =>
      response.arrayBuffer()
    ),
    fetch(experimental_getFontFileURL(boldFontPath, url)).then(response =>
      response.arrayBuffer()
    ),
  ]);

  return { family: "Google Sans Code", regular, bold };
}

async function loadJapaneseOgFonts() {
  const [regular, bold] = await Promise.all([
    loadLocalFont("NotoSansJP-Regular.otf"),
    loadLocalFont("NotoSansJP-Bold.otf"),
  ]);

  return { family: "Noto Sans JP", regular, bold };
}

export async function loadOgFonts(url: URL) {
  switch (config.site.lang) {
    case "en":
      return loadEnglishOgFonts(url);
    case "ja":
      return loadJapaneseOgFonts();
    default:
      throw new Error(`Unsupported OG font language: ${config.site.lang}`);
  }
}
