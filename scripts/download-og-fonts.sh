#!/usr/bin/env bash

set -euo pipefail

readonly FONT_BASE_URL="https://raw.githubusercontent.com/notofonts/noto-cjk/Sans2.004/Sans/SubsetOTF/JP"
readonly FONT_DIR="${OG_FONT_DIR:-.cache/og-fonts}"

mkdir -p "$FONT_DIR"

download_font() {
  local filename="$1"
  local expected_sha256="$2"
  local destination="$FONT_DIR/$filename"
  local temporary

  if [[ -f "$destination" ]] && echo "$expected_sha256  $destination" | sha256sum --check --status; then
    echo "Verified cached OG font: $destination"
    return
  fi

  if [[ -e "$destination" ]]; then
    echo "Cached OG font is invalid; downloading it again: $destination" >&2
    rm -f "$destination"
  fi

  temporary="$(mktemp "$FONT_DIR/.${filename}.XXXXXX")"
  trap 'rm -f "$temporary"' RETURN

  echo "Downloading pinned OG font: $filename"
  curl --fail --location --silent --show-error \
    --retry 3 --retry-delay 2 --retry-all-errors \
    --output "$temporary" "$FONT_BASE_URL/$filename"

  if ! echo "$expected_sha256  $temporary" | sha256sum --check --status; then
    echo "SHA-256 verification failed for downloaded OG font: $filename" >&2
    exit 1
  fi

  mv "$temporary" "$destination"
  trap - RETURN
  echo "Downloaded and verified OG font: $destination"
}

download_font \
  "NotoSansJP-Regular.otf" \
  "dff723ba59d57d136764a04b9b2d03205544f7cd785a711442d6d2d085ac5073"
download_font \
  "NotoSansJP-Bold.otf" \
  "1b0edfb500b73a4fa8a4fcaae1bbbd403994e08e73e3e0da37e70d3853f42c5f"
