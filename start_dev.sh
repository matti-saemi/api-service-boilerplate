#!/bin/bash

# Function to stop all started services
cleanup() {
    echo "Stopping services..."

    # Stop fswatch
    kill $FSWATCH_PID 2> /dev/null

    # Stop serverless
    kill $SERVERLESS_PID

    # Stop Docker containers
    docker-compose -f api-service/docker-compose.yml down

    # Stop frontend app
    kill $FRONTEND_PID

    docker network rm shared-network
}

# Trap the cleanup function to run when the script exits
trap cleanup EXIT

# Directory containing the source code
SRC_DIR="./src"

# Output directory for the consolidated openapi file
OUTPUT_DIR="./docs/api"

# Function to consolidate and compile openapi files
compile_openapi_files() {
    echo "Compiling OpenAPI files..."

    # Find all openapi.yaml files and compile them into HTML
    find "$SRC_DIR" -name 'openapi.yaml' | while read openapi_file; do
        # Get the directory name of the sub-repo
        sub_repo_dir=$(basename $(dirname $(dirname "$openapi_file")))
        # Set the output HTML file name based on the sub-repo directory name
        output_html_file="$OUTPUT_DIR/${sub_repo_dir}.html"

        echo "Compiling $openapi_file to $output_html_file"
        npx @redocly/cli build-docs "$openapi_file" -o "$output_html_file"
    done

    echo "All OpenAPI files have been compiled."
}

# Inform the user that the watcher is starting
echo "Watching for changes in OpenAPI specifications..."

# Use fswatch to watch for changes in openapi.yaml files and run the consolidation and compilation
fswatch -o "$SRC_DIR"/*/docs/openapi.yaml | while read f; do
    echo "Change detected in OpenAPI specification. Reconsolidating and compiling..."
    compile_openapi_files
done &
FSWATCH_PID=$!
sleep 5

# Create a shared Docker network:
docker network create shared-network

# Move to the root directory of your project
cd $SRC_DIR

# Start serverless project
cd api-service
npm run start:dev &
SERVERLESS_PID=$!
sleep 5

# Return to root directory
cd ..

# Function to start Docker container if not running
start_docker() {
    local dir=$1
    local container_name=$2

    if ! docker ps --format '{{.Names}}' | grep -q "$container_name"; then
        cd "$dir"
        docker-compose up &
        cd ..
    fi
}

# Start API service
start_docker api-service api-service_container_name &

# Start frontend app
cd frontend-app
npm start &
FRONTEND_PID=$!
cd ..

# Keep script running until it's manually stopped
wait
