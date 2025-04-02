#!/usr/bin/env bash
echo "Starting .NET build and publish"

# Ensure .NET is available
export DOTNET_ROOT=$HOME/.dotnet
export PATH=$DOTNET_ROOT:$PATH

dotnet --info  # Check if .NET is installed
dotnet restore

#Build a self-contained executable for Linux
dotnet publish src/API/API.csproj -c Release -r linux-x64 --self-contained true -o src/API/out
