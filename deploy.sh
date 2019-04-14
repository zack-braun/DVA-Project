#!/bin/bash
SRC_DIR="./Node"
DST_DIR="../incident-commander"

cd "../dvaproj"
echo "pull latest server changes"
git pull

echo "deleting all files from dvaproj"
rm -r *

cd "../FireHUD"

FILES=("Procfile", "bebel.config.js", "config.js", "controllers", "dist", "main.js", "package-lock.json", "package.json", "postcss.config.js", "routes", "src", "webpack.config.js")
for f in "${FILES[@]}"
do
    cp -r "$SRC_DIR/$f" "$DST_DIR"
    echo "copying: $f"
done

cd "../dvaproj"

echo "current status"
git status

echo "adding local files"
git add -A

echo "commiting files"
read -p "Commit description: " desc
git commit -m "$desc"

echo "pushing to server"
git push heroku master

