#!/usr/bin/env bash
echo "Starting .NET build and publish"

# Ensure .NET is available
export DOTNET_ROOT=$HOME/.dotnet
export PATH=$DOTNET_ROOT:$PATH

dotnet --info  # Check if .NET is installed

# Find the correct API directory
if [ -d "./API" ]; then
    cd API
elif [ -d "./src/API" ]; then
    cd src/API
elif [ -d "$RENDER_PROJECT_ROOT/API" ]; then
    cd "$RENDER_PROJECT_ROOT/API"
elif [ -d "$RENDER_PROJECT_ROOT/src/API" ]; then
    cd "$RENDER_PROJECT_ROOT/src/API"
else
    echo "Error: API directory not found!"
    ls -la  # Print the directory structure to debug
    exit 1
fi

# Build and publish .NET Core app
dotnet restore API.csproj
dotnet publish API.csproj -c Release -r linux-x64 --self-contained false -o out
