# Full-stack Web Developer Portfolio

## Work in Progress
- See the [Project board](https://github.com/users/DNadas98/projects/3) for details

## Requirements
- Node.js, NPM
- Docker or local MySQL database server

## Setup & Run

- Copy `env.txt` template and rename to `.env`, modify values (see details in the template)
  
#### API
- Optional: install NestJS CLI - `npm i -g @nestjs/cli` - [NestJS docs](https://docs.nestjs.com/#installation)
- `npm i`
- `npm build`
- Set up and start the database
- `npm start` or `node dist/main`
- See `package.json` for test, lint and other commands

#### Database
- Option 1: Start the dockerized database using `docker compose up -d`
- Option 2: Set up a MySQL database and a user with all privileges in that database
- Modify the connection string in the `.env`
- `npx prisma generate` to generate `PrismaClient`
- `npx prisma db push` in development mode only (!), or use migrations to syncronize the database with the ORM
  - See the difference between development and production commands in the [Prisma docs](https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production)
