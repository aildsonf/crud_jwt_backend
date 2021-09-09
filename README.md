# &#127758; **Simple User Registration System with TypeScript (Backend)**

<br>

## &#128187; **Technologies**

- [TypeScript (v4.3)](https://www.typescriptlang.org/docs/), a empowered version of JavaScript.
- [Node.js (v14.17)](https://nodejs.org/en/docs/), JavaScript runtime.
- [Express.js](https://expressjs.com/), web apps framework.
- [TypeORM](https://typeorm.io/#/), an ORM to perform SQL queries.
- [bcryptjs](https://www.npmjs.com/package/bcryptjs), lib to encrypt data using hashes.
- [JWT](https://www.npmjs.com/package/jsonwebtoken), lib to generate and validate authorization tokens.

<br>

## &#128194; **Architecture**

All major project files are inside [./src](src) folder.

1. [src/controllers](src/controllers): Methods to manipulate User's data in database and deliver to routes.

2. [src/database](src/database): initial migration to provide first user in database.

3. [src/middlewares](src/middlewares): function to check authorization token and allow or deny not authorized users to perform requests.
   <br>

4. [src/models](src/models): User entity definition.
5. [src/routes](src/routes): routing paths for authentication and users.

<br>

## &#9198; **Version Control**

In order to keep the code updated and track modifications, I've used [Git](https://git-scm.com/doc) (VCS) and [GitHub](https://docs.github.com/) (for remote storage).

<br>

## &#9203; **Running**

In this topic I encourage you to take a quick look on how npm scripts and terminal script works.

> **Note:** Remember to **install dependencies** before anything. You can either do it by using `npm install` or `yarn` (if you like cats &#128571;).
>
> I also remind you to run to mount database (I used mysql-server v8) before running any of this project scripts.

- To run locally: `npm run start` or you can alternatively run `bash run_local.sh` (convenience script I made).

<br>

---
