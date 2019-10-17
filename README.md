# barbershop-api
Node/Express API to integrate with a Barber Shop

* Node.js + Express []
* JWT Authentication using jsonwebtoken []
* Schema validation using Yup []
* Password encryption using bcrypt []
* Background jobs using queues - be-queue []
* Server side mails using nodemailer []
* Email templates using handlebars []

Databases
* postgres (sequelize) for Authentication
* redis for background processing - controll job queues
* mongoDB (mongoose) for Notifications


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
# last migrated file
yarn sequelize db:migrate:undo
# all migrations
yarn sequelize db:migrate:undo:all
```
