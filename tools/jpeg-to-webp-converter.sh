#!/bin/bash

# Loop through each JPEG file and convert it to WebP
for file in *.jpeg; do
    cwebp -q 100 "$file" -o "${file%.jpeg}.webp"
done
