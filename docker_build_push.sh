#!/bin/bash
set -e  # Exit immediately if any command fails

# ----------------------------
# CONFIG
# ----------------------------
REMOTE_TAG="kaver89/projects:vs-eshop-app"
LOCAL_IMAGE="vs-eshop-app:latest"

# ----------------------------
# Step 1: Build the image using Docker Compose
# ----------------------------
echo "🔧 Building Docker image..."
docker compose build --no-cache --progress=plain

# ----------------------------
# Step 2: Tag the image for Docker Hub
# ----------------------------
# Since Docker Hub free tier allows only one private repo,
# we use a unique tag (e.g., :vs-eshop-app) to separate projects.
echo "🏷️ Tagging the image as ${REMOTE_TAG}..."
docker tag $LOCAL_IMAGE $REMOTE_TAG

# ----------------------------
# Step 3: Push the image to the remote repository
# ----------------------------
echo "📤 Pushing the image to Docker Hub..."
docker push $REMOTE_TAG

echo "✅ Build and push process completed successfully."


