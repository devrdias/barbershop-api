# barbershop-api
Node/Express API to integrate with a Barber Shop

* Node.js Back-end + Express [] + Postgres (Sequelize) []
* JWT Authentication using jsonwebtoken []
* Schema validation using Yup []
* Password encryption using bcrypt []
* Front-end React & React Native []

Features
* Use eslint/prettier last version to integrate with VSCode (fix issue with Eslint 6+ and Prettier)
* Use Sucrase [https://github.com/alangpierce/sucrase] as a super-fast alternative to Babel


Sequelize-cli
=============
* Create Migrations
```bash
yarn sequelize migration:create --nane=<create-users>
```
* Perform Migrations
```bash
yarn sequelize db:migrate
```
* Undo Migrations
```bash
yarn sequelize db:migrate:undo //last migrated file
yarn sequelize db:migrate:undo:all //all migrations
```
