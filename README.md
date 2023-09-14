# Drivenpass

Backend application developed in NestJs for web credentials management. Here, you can organize your social media accounts, credit cards, and secure notes.

Try it out now on the API deploy: none at the moment <br/> <br/>
You can also access the documentation, built using Swagger, by navigating to `'/api'` route on the link above, clicking [here](https://drivenpass-nyantise.onrender.com/api), or locally by following the steps to run the application on your machine, described below.

## About

- [x] I divided the code into modules (`@Modules`) and created one for each of the entities: Notes, Cards, Credentials, Users, Auth, separately.
- [x] I used PrismaORM to manage the database, migrations, and execute necessary queries.
- [x] I implemented a repository layer - outside the Nest service pattern to structure the application in layers - to handle database access.
- [x] For the login session on the `'users/sign-in'` route, I used JWT Token verification.
- [x] All routes, except for login and registration, are authenticated using unique user tokens.
- [x] I encrypted all sensitive data for registration and credentials stored in the database.
- [ ] I have Automated Integration Tests with code coverage of over 80%, using design patterns with factories.


## Main Technologies
<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/NestJS-E0234E.svg?style=for-the-badge&logo=NestJS&logoColor=white'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Prisma-2D3748.svg?style=for-the-badge&logo=Prisma&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Jest-C21325.svg?style=for-the-badge&logo=Jest&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/.ENV-ECD53F.svg?style=for-the-badge&logo=dotenv&logoColor=black"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Swagger-85EA2D.svg?style=for-the-badge&logo=Swagger&logoColor=black"/>
</p>

## Installation
before anything you will need to have node 16+ installed on your computer
```bash
$ git clone https://github.com/Nyantise/drivenpass
$ cd drivenpass
$ npm install
```

## Running the app

Create a .env and .env.test file on the root of the project
```bash
POSTGRES_USERNAME=your_postgres_username
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_HOST=your_postgres_host
POSTGRES_PORT=your_postgres_port
POSTGRES_DATABASE=your_postgres_db_name

# or you can just set DATABASE_URL directly like:
DATABASE_URL="postgresql://username:your_password@localhost:5432/driven-pass-db?schema=public"

# and you will need to set your JWT and Cryptr secrets:
JWT_SECRET=your_jwt_secret
CRYPTR_SECRET=your_crypt_secret
```

Run prisma migrations to create all the database tables, constraints and configs
```bash
$ npx prisma generate
$ npx prisma migrate dev
$ npm run test:prisma
```

How to run
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

How to test1
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Author

- Daniel Rodrigues de Oliveira

[Licensed under GNU Affero General Public License v3.0](LICENSE).