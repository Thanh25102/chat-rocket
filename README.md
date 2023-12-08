# ChatRocket Project

Enhance your communication with our ChatRocket, a versatile chat application offering a range of functionalities.

## Features

- **Private Chat**: Engage in one-on-one conversations.
- **Group Chat**: Collaborate effectively through group discussions.
- **User Management**: Tailor user experiences with comprehensive user management (exclusive to admins).
- **Google Sign-In**: Enjoy quick and secure access with Google Sign-In option.
- **Registration and Login**: Experience flawless user registration and login process.
- **Password Recovery**: Secure user accounts with password recovery feature.

## Built With

ChatRocket application is developed using:

- `Spring Boot framework` for creating stand-alone, production-grade Spring-based applications
- `Hilla`, a go-to solution for building highly interactive user applications

## How to Run the Application

### Maven Project

1. `mvnw` (Windows)
2. `./mvnw` (macOS & Linux)
3. Launch `http://localhost:8080` in any browser

### Docker Commands

Alternatively, run the application with Docker using the following commands:

``` docker compose build && docker compose up ```

You can now access the application by opening `http://localhost:8080` in your browser.

## Deploying to Production

For deploying the application to production:

1. Build the Docker using the commands mentioned in the previous section
2. Upon successful Docker build, your application will be production-ready

## Project Structure

An overview of project structure:

<table style="width:100%; text-align: left;">
  <tr><th>Directory</th><th>Description</th></tr>
  <tr><td><code>frontend/</code></td><td>Client-side source directory</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>index.html</code></td><td>HTML template</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>index.ts</code></td><td>Frontend 
entrypoint, bootstraps a React application</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>routes.tsx</code></td><td>React Router routes definition</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>MainLayout.tsx</code></td><td>Main 
layout component, contains the navigation menu, uses <a href="https://hilla.dev/docs/react/components/app-layout">
App Layout</a></td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>views/</code></td><td>UI view 
components</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>themes/</code></td><td>Custom  
CSS styles</td></tr>
  <tr><td><code>src/main/java/&lt;groupId&gt;/</code></td><td>Server-side 
source directory, contains the server-side Java views</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>Application.java</code></td><td>Server entry-point</td></tr>
</table>

## Resources

- Dive deeper into Hilla features with the [official documentation](https://hilla.dev/docs/)
- Stuck somewhere? Shoot your queries on [Stack Overflow](https://stackoverflow.com/questions/tagged/hilla) or join our vibrant [Discord channel](https://discord.gg/MYFq5RTbBn)
- Help us improvise or report issues on [GitHub](https://github.com/vaadin/hilla)

