#!/usr/bin/env -S fish --no-config

cd ./worktrees/main

git add .
git commit --message "Sync info."
git push
