## Description

This is a simple NestJS application that uses the NestJS TypeORM module, Local Authentication, and JWT Authentication. It is a simple CRUD application that allows you to create, read, update, and delete users. It also allows you to login and reset password.

## Installation

```bash
$ npm install
```

## Setting up the environment variables

Create a .env file in the root of the project and add the following (replace the values with your own):

```bash
SECREAT_KEY= 'secretKey'
DB_HOST='localhost'
DB_PORT=3306
DB_USER='database user'
DB_PASSWORD= 'database password'
DB_NAME= 'database name'
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
