[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

[contributors-shield]: https://img.shields.io/github/contributors/DNadas98/portfolio-backend-nestjs.svg?style=for-the-badge

[contributors-url]: https://github.com/DNadas98/portfolio-backend-nestjs/graphs/contributors

[issues-shield]: https://img.shields.io/github/issues/DNadas98/portfolio-backend-nestjs.svg?style=for-the-badge

[issues-url]: https://github.com/DNadas98/portfolio-backend-nestjs/issues

[license-shield]: https://img.shields.io/github/license/DNadas98/portfolio-backend-nestjs.svg?style=for-the-badge

[license-url]: https://github.com/DNadas98/portfolio-backend-nestjs/blob/master/LICENSE.txt

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555

[linkedin-url]: https://linkedin.com/in/daniel-nadas

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
    <br />
    <!--
    <a href="https://github.com/DNadas98/portfolio-backend-nestjs">View Demo</a>
    ·
    <a href="https://github.com/DNadas98/portfolio-backend-nestjs/issues">Report Bug</a>
    ·
    <a href="https://github.com/DNadas98/portfolio-backend-nestjs/issues">Request Feature</a>
  -->
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
    <li><a href="#usage">Usage</a></li>
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

<div>
  <a href="https://react.dev/" target="_blank" referrerpolicy="no-referrer">
    <figure style="display: inline-block; margin-right: 20px;">
      <img src="https://dnadas.net/wp-content/uploads/2023/12/icons8-react-js-100.webp" alt="React JS" style="height:40px;">
      <figcaption>React JS</figcaption>
    </figure>
  </a>
</div>

### Backend

<div>
  <a href="https://nodejs.org/en" target="_blank" referrerpolicy="no-referrer">
    <figure style="display: inline-block; margin-right: 20px;">
      <img src="https://dnadas.net/wp-content/uploads/2023/12/icons8-node-js-96.webp" alt="Node.js" style="height:40px;width:auto;;">
      <figcaption>Node.js</figcaption>
    </figure>
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank" referrerpolicy="no-referrer">
    <figure style="display: inline-block; margin-right: 20px;">
      <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="Typescript" style="height:40px;width:auto;;">
      <figcaption>Typescript</figcaption>
    </figure>
  </a>
  <a href="https://nestjs.com/" target="_blank" referrerpolicy="no-referrer">
    <figure style="display: inline-block; margin-right: 20px;">
      <img src="https://nestjs.com/logo-small.ede75a6b.svg" alt="NestJS" style="height:40px;">
      <figcaption>NestJS</figcaption>
    </figure>
  </a>
</div>

### Database, ORM

<div>
  <a href="https://www.mysql.com/" target="_blank" referrerpolicy="no-referrer">
    <figure style="display: inline-block; margin-right: 20px;">
      <img src="https://dnadas.net/wp-content/uploads/2023/12/icons8-mysql-96-1.webp" alt="MySQL" style="height:40px;width:auto;">
      <figcaption>MySQL</figcaption>
    </figure>
  </a>
  <a href="https://www.prisma.io/" target="_blank" referrerpolicy="no-referrer">
    <figure style="display: inline-block; margin-right: 20px;">
      <img src="https://cdn.freelogovectors.net/wp-content/uploads/2022/01/prisma_logo-freelogovectors.net_-330x400.png" alt="Prisma" style="height:40px;width:auto;">
      <figcaption>Prisma ORM</figcaption>
    </figure>
  </a>
</div>

### Integration

<div>
  <a href="https://github.com/features/actions" target="_blank" referrerpolicy="no-referrer">
    <figure style="display: inline-block; margin-right: 20px;">
      <img src="https://dnadas.net/wp-content/uploads/2023/12/GitHub-Actions.webp" alt="Github Actions" style="height:40px;width:auto;;">
      <figcaption>GitHub Actions</figcaption>
    </figure>
  </a>
</div>

## Getting Started

### Prerequisites

- [Node.js, NPM](https://nodejs.org/en/download)
  - The project uses Node.js `v20.10.0` and NPM `10.2.3` versions. 
  - This is the latest available version right now at the web hosting service I will 
    deploy to, but feel free to try other versions, and please post an issue or 
    contact me if you run into any problems
- [Docker](https://www.docker.com/) for the Docker Compose MySQL database setup, or 
  feel free to use any of the [databases compatible with Prisma ORM](https://www.prisma.io/docs/orm/reference/supported-databases) in any form

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

See the [API Documentation](https://www.postman.com/cc-tasx/workspace/dnadas98-public/documentation/30693601-153ba7e4-663e-46da-b37c-7c6e95493b00)

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

Project Link: [https://github.com/DNadas98/portfolio-backend-nestjs](https://github.com/DNadas98/portfolio-backend-nestjs)


