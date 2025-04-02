#!/usr/bin/env bash
echo "Starting .NET build and publish"

# Ensure .NET is available
export DOTNET_ROOT=$HOME/.dotnet
export PATH=$DOTNET_ROOT:$PATH

dotnet --info  # Check if .NET is installed

# Move into the API directory before restoring and publishing
cd API

dotnet restore API.csproj
dotnet publish API.csproj -c Release -r linux-x64 --self-contained false -o out
