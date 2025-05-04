#!/bin/bash

# Create assets directory if it doesn't exist
mkdir -p assets

# Generate different sizes of icons
for size in 16 32 48 128; do
  convert -background none -resize ${size}x${size} assets/icon.svg assets/icon-${size}.png
done 