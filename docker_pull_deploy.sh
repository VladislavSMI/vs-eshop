#!/bin/bash
# Exit immediately if any command fails
set -e  

CONTAINER_NAME="vs-eshop-app-container"
IMAGE_NAME="kaver89/projects:vs-eshop-app"


# Step 1: Retrieve Docker Hub credentials from AWS SSM Parameter Store
echo "Retrieving Docker Hub credentials from SSM..."

DOCKER_USERNAME=$(aws ssm get-parameter --name "/MyApp/DockerHub/Username" --query "Parameter.Value" --output text)
DOCKER_TOKEN=$(aws ssm get-parameter --name "/MyApp/DockerHub/Token" --with-decryption --query "Parameter.Value" --output text)

# Step 2: Authenticate with Docker Hub
echo "Logging in to Docker Hub..."
echo "$DOCKER_TOKEN" | docker login -u "$DOCKER_USERNAME" --password-stdin

# Step 3: Pull the latest Docker image
echo "Pulling the latest Docker image..."
docker pull "$IMAGE_NAME"

# Step 4: Stop and remove old container (if exists)
echo "Stopping and removing old container if it exists..."
if docker ps -a --format '{{.Names}}' | grep -Eq "^${CONTAINER_NAME}$"; then
    docker stop "$CONTAINER_NAME"
    docker rm "$CONTAINER_NAME"
fi

# Step 5: Run the new container
echo "🚀 Starting new container..."
docker run -d \
  --name "$CONTAINER_NAME" \
  --restart always \
  -p 3000:3000 \
  --env-file .env \
  "$IMAGE_NAME"

echo "✅ Deployment completed successfully."
