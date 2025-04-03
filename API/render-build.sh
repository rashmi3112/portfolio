#!/usr/bin/env bash
echo "Starting .NET build and publish"

# Ensure .NET is available
export DOTNET_ROOT=$HOME/.dotnet
export PATH=$DOTNET_ROOT:$PATH

dotnet --info  # Check if .NET is installed

# Find the correct API directory
if [ -d "./src/API" ]; then
    cd src/API
else
    echo "Error: API directory not found!"
    ls -la  # Print directory structure for debugging
    exit 1
fi

# Build and publish .NET Core app
dotnet restore API.csproj
dotnet publish API.csproj -c Release -o out

# Run the API
dotnet out/API.dll
