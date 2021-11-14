# Online shop

## About This Project

Online-Shop with express,sequlize

## RUN

1-clone this repo

2-To run this app, set your variables in .env file at the root of the project

-   port

-   JWT_KEY

-   EXPIRE_TIME

## example :

port =300
JWT_KEY= "secretcode"
EXPIRE_TIME= "1w

3-in config/database/sequlize.js set your database name,user,password,host and port

4-npm install

5-node index.js

6- run seeders:
-   npx sequelize-cli db:seed --seed 20211109091139-roles
-   npx sequelize-cli db:seed --seed 20211109082457-permission
-   npx sequelize-cli db:seed --seed 20211109090157-admins.js
-   npx sequelize-cli db:seed --seed 20211109091829-role-permission

7-node index.js

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/12694267-d5765185-2f2d-47ac-bae4-0cf88f887b37?action=collection%2Ffork&collection-url=entityId%3D12694267-d5765185-2f2d-47ac-bae4-0cf88f887b37%26entityType%3Dcollection%26workspaceId%3Dbefe7c4b-c8d0-4fb8-b443-7e4deccd31ff)

## Node modules

-   Nodejs version 16.11.6
-   express version 4.17.1
-   mysql2 version 2.3.2
-   sequelize version 6.8.0
-   sequelize-cli version 6.3.0
-   validator version 13.6.0
-   dotenv version 10.0.0
-   crypto version 1.0.1
-   jsonwebtoken version 8.5.1
-   nodemon version 2.0.14
-   yargs version 17.2.1
