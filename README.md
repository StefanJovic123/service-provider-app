# Service Provider App - BACKEND


## Instructions for starting App

#### prerequisites
1. Node.js version: 14.15.1
2. Postgres version 10
3. DB with name `service-provider-app` needs to be created before running app
4. Add .env file into root of application with following values:
```
PORT=8080
ENVIRONMENT=DEV
JWT_SECRET=secretjwttoken

PSQL_DB_HOST=localhost
PSQL_DB_DATABASE=service-provider-app
PSQL_DB_USERNAME=root3
PSQL_DB_PASSWORD=root
```

#### starting app
after all steps above are completed following commands needs to be executed
1. run command `yarn install`
2. run command `yarn setup:db` - this command will run migrations and seeders
3. run command `yarn start` or `yarn start:dev` - this command will use `nodemon`

Application will be available on port `8080` if not specified otherwise - it is recommended to use 8080 as apps port cause of Postman collection added as part of this repo

4. Load postman collection into Postman App and start playing with app.


# Arhitecture
Applications architecture is based on Clean Architecture there are 5 Layers that communicate only with their neighbors while calling only entities from the layer beneath and responding to messages from the layer above.

![78fdb352-ffb7-4f60-bb66-9782fa9ed7c4](https://user-images.githubusercontent.com/11150288/121835644-17d58600-ccd2-11eb-8cb9-dabb8a3895d9.png)

Communication between infrastructure, application, and domain layers is shown on the next diagram. We can see here that controllers are aggregation layer above use cases and any controller can use an arbitrary number of use cases**.* Since the infrastructure layer contains express as HTTP framework, we need ExpressController mapper that will make sure that all necessary mappings, between express route handler and application layer's controller, are done. Common logic includes HTTP, JWT and validation libraries, etc.

In most cases, this will be only one, but in special cases, there is an option to use multiple

![2d229ab1-d84d-48fe-906d-2c4171a503ea](https://user-images.githubusercontent.com/11150288/121836766-6be16a00-ccd4-11eb-8dca-97c12d9fd4f3.png)

Domain layer entities' interactions and relations are shown on the following diagram.

![4c4651a4-1d26-4cf8-9dcf-8a35b17a5c56](https://user-images.githubusercontent.com/11150288/121836819-8582b180-ccd4-11eb-9dc1-718c804b6aa5.png)



# Improvments/Additions - Yet to be done
- [] Improve tests coverage
- [] Improve tests quality
- [] Add integration tests
- [] Add end-to-end tests by using `newman` + `postman collection`
- [] Separate all layers into separate libs which can be included in any project just by installing it.
