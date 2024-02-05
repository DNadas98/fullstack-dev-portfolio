<p align="center">
  <a href="https://github.com/DNadas98/portfolio-backend-nestjs/actions/workflows/nodejs.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/DNadas98/portfolio-backend-nestjs/nodejs.yml?style=for-the-badge" alt="Build">
  </a>
  <a href="https://github.com/DNadas98/portfolio-backend-nestjs/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/DNadas98/portfolio-backend-nestjs.svg?style=for-the-badge" alt="Contributors">
  </a>
  <a href="https://github.com/DNadas98/portfolio-backend-nestjs/issues">
    <img src="https://img.shields.io/github/issues/DNadas98/portfolio-backend-nestjs.svg?style=for-the-badge" alt="Issues">
  </a>
  <a href="https://github.com/DNadas98/portfolio-backend-nestjs/blob/master/LICENSE.txt">
    <img src="https://img.shields.io/github/license/DNadas98/portfolio-backend-nestjs.svg?style=for-the-badge" alt="License">
  </a>
  <a href="https://linkedin.com/in/daniel-nadas">
    <img src="https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555" alt="LinkedIn">
  </a>
</p>

<br xmlns="http://www.w3.org/1999/html"/>
<div align="center">
  <a href="https://github.com/DNadas98/portfolio-backend-nestjs">
    <img src="https://avatars.githubusercontent.com/u/125133206?v=4" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Full-stack Web Developer Portfolio</h3>
  <p align="center">
    Created by <a href="https://github.com/DNadas98">DNadas98 (Dániel Nádas)</a>
    <br />
    <a href="https://github.com/users/DNadas98/projects/3"><strong>View the Project Board »</strong></a>
    <br />
    <a href="https://www.postman.com/cc-tasx/workspace/dnadas98-public/documentation/30693601-153ba7e4-663e-46da-b37c-7c6e95493b00"><strong>Read the API Documentation »</strong></a>
    <br />
    <br />
    <a href="https://github.com/DNadas98/portfolio-backend-nestjs/issues">Report Bug</a>
    ·
    <a href="https://github.com/DNadas98/portfolio-backend-nestjs/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#tech-stack">Tech Stack</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#setup--run">Setup and run</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#configuration-of-default-api-security-middlewares">Configuration of default API security middlewares</a></li>
        <li><a href="#authentication-authorization">Authentication, authorization</a></li>
        <li><a href="#api-documentation">API Documentation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

My portfolio full-stack application is able to dynamically present my projects using my
GitHub REST API integration. Project metadata, like project names, code snippet
filenames are stored in the database, managed by the backend API. Using these, my app
is able to fetch the current, up to date project details and associated code snippets from
GitHub. A secure admin dashboard is also implemented to manage stored projects

## Tech Stack

### Frontend

[![React JS](https://img.shields.io/badge/-React_JS-60D9FA?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)

### Backend

[![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=black)](https://nodejs.org/en)
[![Typescript](https://img.shields.io/badge/-Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/-NestJS-E02329?style=for-the-badge&logo=nestjs&logoColor=black)](https://nestjs.com/)

### Database, ORM

[![MySQL](https://img.shields.io/badge/-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=black)](https://www.mysql.com/)
[![Prisma ORM](https://img.shields.io/badge/-Prisma_ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=black)](https://www.prisma.io/)

### Integration and Deployment

[![Docker](https://img.shields.io/badge/-Docker-1d63ed?style=for-the-badge&logo=docker&logoColor=black)](https://www.docker.com/)
[![GitHub Actions](https://img.shields.io/badge/-GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=black)](https://github.com/features/actions)

## Getting Started

### Prerequisites

- [Node.js, NPM](https://nodejs.org/en/download)
  - The project uses Node.js `v20.10.0` and NPM `10.2.3` versions.
  - This is the latest available version right now at the web hosting service I will
    deploy to, but feel free to try other versions, and please post an issue or
    contact me if you run into any problems
- [Docker](https://www.docker.com/) for the Docker Compose MySQL database setup, or
  feel free to use any of
  the [databases compatible with Prisma ORM](https://www.prisma.io/docs/orm/reference/supported-databases)
  in any form

### Setup & Run

- Copy `env.txt` template and rename to `.env`, modify values (see details in the
  template)

#### API

- Optional: install NestJS
  CLI - `npm i -g @nestjs/cli` - See [NestJS docs](https://docs.nestjs.com/#installation)
- Run `npm install` to install the project
- Run `npm build` to compile typescript
- Set up and start the database (required to start the server on purpose)
- `npm start` or `node dist/main`
- See `package.json` for test, lint and other commands
- Import and use the included Postman collection to test endpoints

#### Database

- Option 1: Start the dockerized database using `docker compose up -d`
- Option 2: Set up a MySQL database and a user with all privileges in that database
- Modify the connection string in the `.env`
- `npx prisma generate` to generate `PrismaClient`
- `npx prisma db push` in development mode only (!), or use migrations to syncronize the
  database with the ORM
  - See the difference between development and production commands in
    the [Prisma docs](https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production)

## Usage

### Configuration of default API Security middlewares:

- Security headers like Content Security Policy are configured in
  `src/common/config/helmetConfig.ts`. The middleware is enabled in `src/main.ts`
- CORS (Cross Origin Resource Sharing) is configured in`src/common/config/corsConfig.ts`.
  The origins allowed by CORS are set and the middleware is enabled in `src/main.ts`
- Rate limiters are configured in`src/common/config/rateLimiterOptions.ts`.
  The global one is enabled globally in `src/AppModule.ts`, others can be applied for
  specific controllers or requests inside controllers, as overrides of the default
  using `@Throttler({ default: xyzRateLimiter })`

### Authentication, authorization

The API uses JWTs (JSON Web Tokens) for authentication. After a successful login at the
Login endpoint, the user receives a Bearer Token in the response body, and a Refresh Token
as a cookie named `jwtrefresh`. This cookie is HTTPOnly, SameSite = "strict", Secure)
Secured endpoints can be accessed by supplying the Bearer Token in the Authorization
header as "Bearer ".
If the access token has expired, a new access token can be requested using the Refresh
endpoint, as long as the Refresh Token is still valid and available as a cookie.
The API uses a simple form of Role Based Access Control, current valid roles are "USER"
and "ADMIN". A list of allowed roles is defined for all secured endpoints. For example,
both users with "USER" or "ADMIN" role can access their own account details, but the
details of other accounts are only accessible with "ADMIN" role.

### API Documentation

See
the [API Documentation](https://www.postman.com/cc-tasx/workspace/dnadas98-public/documentation/30693601-153ba7e4-663e-46da-b37c-7c6e95493b00)
for available endpoints and API usage guide

## Roadmap

- See the [Project board](https://github.com/users/DNadas98/projects/3) to track the
  progress of this project
- See the [open issues](https://github.com/DNadas98/portfolio-backend-nestjs/issues) for a
  full list of proposed features (and known issues).

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact

Dániel Nádas

- My GitHub profile: [DNadas98](https://github.com/DNadas98)
- My webpage: [dnadas.net](https://dnadas.net)
- E-mail: [daniel.nadas@dnadas.net](mailto:daniel.nadas@dnadas.net)
- LinkedIn: [Dániel Nádas](https://www.linkedin.com/in/daniel-nadas)

Project
Link: [https://github.com/DNadas98/portfolio-backend-nestjs](https://github.com/DNadas98/portfolio-backend-nestjs)


