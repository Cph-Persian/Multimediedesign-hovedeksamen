#!/bin/bash
# ─────────────────────────────────────────────────────────────
# push-to-github.command
# Dobbeltklik denne fil i Finder for at pushe projektet til GitHub.
# Den initialiserer git, committer alt, og pusher til main.
# ─────────────────────────────────────────────────────────────

set -e
cd "$(dirname "$0")"

REPO_URL="${1:-}"
if [ -z "$REPO_URL" ]; then
  echo ""
  echo "Indtast GitHub-repo URL (HTTPS eller SSH), fx:"
  echo "  https://github.com/<user>/<repo>.git"
  echo "  git@github.com:<user>/<repo>.git"
  echo ""
  read -r -p "Repo URL: " REPO_URL
fi

echo ""
echo "════════════════════════════════════════════════════════"
echo "  Pusher Ministeriets AI-Platform til GitHub"
echo "  Repo: $REPO_URL"
echo "════════════════════════════════════════════════════════"
echo ""

# 1. Initialisér git hvis ikke allerede gjort
if [ ! -d ".git" ]; then
  echo "→ Initialiserer git-repository..."
  git init
  git branch -M main
else
  echo "→ Git-repository findes allerede."
fi

# 2. Tilføj alle filer (respekterer .gitignore)
echo "→ Tilføjer filer..."
git add .

# 3. Commit (kun hvis der er ændringer)
if git diff --cached --quiet; then
  echo "→ Ingen nye ændringer at committe."
else
  echo "→ Committer..."
  git commit -m "Opdatering af platform"
fi

# 4. Tilføj remote hvis ikke allerede sat
if ! git remote get-url origin > /dev/null 2>&1; then
  echo "→ Forbinder til GitHub..."
  git remote add origin "$REPO_URL"
else
  echo "→ Remote 'origin' findes allerede."
fi

# 5. Push
echo "→ Pusher til GitHub..."
git push -u origin main

echo ""
echo "════════════════════════════════════════════════════════"
echo "  ✓ FÆRDIG — projektet er nu på GitHub"
echo "  Se: https://github.com/persianmoradi/Multimediedesign-hovedeksamen"
echo "════════════════════════════════════════════════════════"
echo ""
echo "Tryk en tast for at lukke vinduet..."
read -n 1
