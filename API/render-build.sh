#!/bin/bash
set -e  # Stop script if any command fails

echo "Starting .NET build and publish"

# Restore dependencies
dotnet restore API/

# Build and publish
dotnet publish API/ -c Release -o API/out

echo "Build and publish completed"
