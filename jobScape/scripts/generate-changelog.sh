#!/usr/bin/env bash
set -euo pipefail

VERSION=${1:-}
if [ -z "$VERSION" ]; then
  echo "Usage: $0 <version>" >&2
  exit 1
fi

# Determine range for changelog
if git describe --tags --abbrev=0 >/dev/null 2>&1; then
  PREV_TAG=$(git describe --tags --abbrev=0)
  RANGE="$PREV_TAG..HEAD"
else
  RANGE=""
fi

echo "# Changelog for $VERSION" > CHANGELOG.md
git log $RANGE --pretty=format:'- %s (%h)' >> CHANGELOG.md
echo >> CHANGELOG.md
