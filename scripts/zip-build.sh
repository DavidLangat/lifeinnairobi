#!/bin/bash

# Ensure we are in the project root
cd "$(dirname "$0")/.." || exit

# Create the builds directory if it doesn't exist
mkdir -p builds

# Find the next build number
NEXT_BUILD_NUM=1
while [ -f "builds/build-${NEXT_BUILD_NUM}.zip" ]; do
  NEXT_BUILD_NUM=$((NEXT_BUILD_NUM + 1))
done

# Check if 'out' directory exists
if [ ! -d "out" ]; then
  echo "Error: 'out' directory does not exist. Please ensure next build outputs to 'out'."
  exit 1
fi

echo "Zipping build to builds/build-${NEXT_BUILD_NUM}.zip..."

# Change to the 'out' directory so the zip structure is flat
cd out || exit

# Zip everything except sitemap.xml, robots.txt, and the images folder
# We use -q for quiet, -r for recursive
zip -r -q "../builds/build-${NEXT_BUILD_NUM}.zip" . -x "sitemap.xml" -x "robots.txt"

echo "Successfully created builds/build-${NEXT_BUILD_NUM}.zip"
