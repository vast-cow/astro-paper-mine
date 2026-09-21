import { readFile } from "node:fs/promises";
import path from "node:path";

const fontDirectory = process.env.OG_FONT_DIR ?? ".cache/og-fonts";

async function loadFont(filename: string): Promise<Buffer> {
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

export async function loadOgFonts() {
  const [regular, bold] = await Promise.all([
    loadFont("NotoSansJP-Regular.otf"),
    loadFont("NotoSansJP-Bold.otf"),
  ]);

  return { regular, bold };
}
