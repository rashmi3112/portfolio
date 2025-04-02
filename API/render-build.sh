#!/usr/bin/env bash
echo "Starting .NET build and publish"

# Ensure .NET is available
export DOTNET_ROOT=$HOME/.dotnet
export PATH=$DOTNET_ROOT:$PATH

dotnet --info  # Check if .NET is installed
cd API  # Move into the API directory
dotnet restore
dotnet publish -c Release -r linux-x64 --self-contained true -o out
