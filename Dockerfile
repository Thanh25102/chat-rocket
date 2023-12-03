# ---- Build Stage ----
FROM openjdk:21 AS build

# Set the working directory in the Docker image
WORKDIR /app

# Copy the Maven wrapper and pom.xml file
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download all dependencies
RUN ./mvnw dependency:go-offline -B

# Copy the source code
COPY . .

# Package the application with the production profile
RUN ./mvnw package -Pproduction -DskipTests

# ---- Run Stage ----
FROM openjdk:21

WORKDIR /app

# Copy the built jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
