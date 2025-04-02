#!/bin/bash
set -e

echo "Starting .NET build and publish"
dotnet restore
dotnet publish -c Release -o API/bin/Release/net8.0
echo "Build and publish completed!"