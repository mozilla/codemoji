#!/bin/bash

echo "Building custom lodash"

lines=$(ack '\_\.[a-z]+' --ignore-dir public --ignore-dir emojiListBuilder --js --output '$&' --sort-files --nogroup --no-filename | cut -d '.' -f 2 | sort | uniq)
# echo $lines
lines=$(echo $lines | tr " " ",")
# echo $lines
node_modules/.bin/lodash include="$lines" -o vendor/lodash.min.js -p

