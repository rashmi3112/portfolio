#!/usr/bin/env bash
echo "Starting .NET build and publish"

# Ensure .NET is available
export DOTNET_ROOT=$HOME/.dotnet
export PATH=$DOTNET_ROOT:$PATH

dotnet --info  # Check if .NET is installed

# Find the correct API directory
if [ -d "./API" ]; then
    cd API
else
    echo "Error: API directory not found!"
    exit 1
fi

# Restore and publish the application
dotnet restore API.csproj
dotnet publish API.csproj -c Release -r linux-x64 --self-contained false -o out
