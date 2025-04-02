#!/bin/bash
set -e  # Stop script if any command fails

echo "Updating package list..."
apt-get update

echo "Installing .NET SDK 8.0..."
apt-get install -y dotnet-sdk-8.0

echo "Building and publishing .NET backend..."
dotnet publish -c Release -o out
