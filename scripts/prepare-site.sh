#!/usr/bin/env bash
set -euo pipefail

readonly ASTRO_PAPER_VERSION="v6.1.0"
readonly REPOSITORY_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
readonly DESTINATION="${1:?Usage: scripts/prepare-site.sh DESTINATION}"
readonly ARCHIVE_URL="https://github.com/satnaing/astro-paper/archive/refs/tags/${ASTRO_PAPER_VERSION}.tar.gz"

rm -rf "$DESTINATION"
mkdir -p "$DESTINATION"

curl --fail --location --silent --show-error "$ARCHIVE_URL" |
  tar --extract --gzip --strip-components=1 --directory "$DESTINATION"

# Keep the complete upstream configuration available to the small local wrapper,
# which only supplies deployment values that GitHub Pages determines at build time.
mv "$DESTINATION/astro.config.ts" "$DESTINATION/astro.config.upstream.ts"

# The upstream repository includes documentation and example content. Remove that
# content so this repository remains the source of truth for pages and posts.
rm -rf "$DESTINATION/src/content"

# Files are kept at their normal AstroPaper paths in this repository. Operational
# files used only to assemble the site are intentionally not copied into the build.
rsync --archive \
  --exclude='.git/' \
  --exclude='.github/' \
  --exclude='.gitignore' \
  --exclude='README.md' \
  --exclude='scripts/' \
  "$REPOSITORY_ROOT/" "$DESTINATION/"
