#!/usr/bin/env bash
echo "Starting .NET build and publish"

# Ensure .NET is available
export DOTNET_ROOT=$HOME/.dotnet
export PATH=$DOTNET_ROOT:$PATH

dotnet --info  # Check if .NET is installed

# No need to change directories if API.csproj is already in the root
if [ ! -f "./API.csproj" ]; then
    echo "Error: API.csproj not found in the expected location!"
    ls -la  # Print directory structure for debugging
    exit 1
fi

# Build and publish .NET Core app
dotnet restore API.csproj
dotnet publish API.csproj -c Release -o out

echo "Build completed successfully!"
