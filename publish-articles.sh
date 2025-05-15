#!/bin/bash

set -euxo pipefail

export CURRENT_TIME=$(date -u +"%Y-%m-%dT%H:%M:%S.%3NZ")
find src/articles -type f | while read -r file; do
  envsubst '$CURRENT_TIME' < "$file" > temp && mv temp "$file"
done


