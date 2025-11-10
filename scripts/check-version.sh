#!/bin/bash

# Check if package version already exists on npm
PACKAGE_NAME=$(node -p "require('./package.json').name")
PACKAGE_VERSION=$(node -p "require('./package.json').version")

echo "🔍 Checking if $PACKAGE_NAME@$PACKAGE_VERSION exists on npm..."

if npm view "$PACKAGE_NAME@$PACKAGE_VERSION" version --json >/dev/null 2>&1; then
  echo "❌ Error: Version $PACKAGE_VERSION already exists on npm!"
  echo "   Please update version in package.json before publishing."
  exit 1
else
  echo "✅ Version $PACKAGE_VERSION is available for publishing."
fi