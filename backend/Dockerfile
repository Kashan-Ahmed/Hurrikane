# Use the official .NET 8 SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

# Copy the remaining source code
COPY . ./

# Build the app
RUN dotnet publish -c Release -o out

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy built output from the build stage
COPY --from=build /app/out ./

# Expose the port defined in .env (default to 5000)
ENV PORT=5000
EXPOSE 5000

# Start the app
ENTRYPOINT ["dotnet", "backend.dll"]


