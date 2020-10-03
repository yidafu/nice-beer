#!/usr/bin/env sh
echo "Build files ..."
yarn build



set -e
echo "Enter release version: "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  npm version $VERSION --message "[release] $VERSION"

  echo "Copy README.md to dist/"
  cp README.md dist/
  echo "Copy package.json to dist/"
  cp package.json dist/
  echo "Go to dist/"
  cd dist/
  echo

  # publish
  BRANCH=$(git symbolic-ref --short HEAD)
  git push origin $BRANCH
  if [ $BRANCH == 'master' ]
  then
    echo "Add tag v$VERSION"
    git push origin refs/tags/v$VERSION
    npm publish --access public --registry https://registry.npmjs.org/
  else
    npm publish --tag beta --access public --registry https://registry.npmjs.org/
  fi
fi
