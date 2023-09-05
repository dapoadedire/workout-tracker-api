README, please.


docker build . -t dapoadedire/workout-tracker-api

docker run -p 4000:4000 -d dapoadedire/workout-tracker-api


OR

docker build -t my-node-app .

docker run -p 4000:4000 my-node-app


https://workout-tracker-api-nj5n.onrender.com/

docker ps

docker stop <container_id_or_name>



<!-- Some Docker Commands -->


```bash
# Docker Version
docker version

# List Containers
docker ps

# List All Containers
docker ps -a

# List Images
docker images

# Run a Container
docker run <image_name>

# Stop a Container
docker stop <container_id_or_name>

# Remove a Container
docker rm <container_id_or_name>

# Remove All Containers
docker rm $(docker ps -a -q)

# Remove an Image
docker rmi <image_name_or_id>

# Pull an Image from Docker Hub
docker pull <image_name>

# Build a Docker Image
docker build -t <image_name> <path_to_Dockerfile>

# Run a Container with Port Mapping
docker run -p <host_port>:<container_port> <image_name>

# Run a Container in Detached Mode
docker run -d <image_name>

# View Container Logs
docker logs <container_id_or_name>

# Execute a Command in a Running Container
docker exec -it <container_id_or_name> <command>

# Inspect Container or Image Details
docker inspect <container_id_or_name_or_image>

# Create a Docker Network
docker network create <network_name>
