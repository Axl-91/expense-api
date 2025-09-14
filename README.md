# Expense API


## Description
API for income/expense storing.

The data will be stored in an postgreSQL database

## Project setup

```bash
$ npm install
```

## DB setup and migrations

Create `.env` file with the following parameters
```
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_PORT=
JWT_SECRET=
```

Generate the db via docker compose
```bash
# Start DB
docker compose up -d

# Stop db
docker compose down
```

Run the migrations for the db
```bash
# Run migrations
npm run migration:run
```

## Compile and run the project

```bash
# developmentin
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
