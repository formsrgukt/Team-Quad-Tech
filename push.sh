#!/usr/bin/env bash
# Team Quad Tech - Automated Git Push Helper
# Runs node scripts/push.js forwarding any commit message arguments

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
node "$DIR/scripts/push.js" "$@"
