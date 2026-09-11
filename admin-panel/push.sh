#!/usr/bin/env bash
# Team Quad Tech - Automated Git Push Helper (Admin Panel wrapper)
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
node "$DIR/../scripts/push.js" "$@"
