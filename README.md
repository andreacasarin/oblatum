## Oblatum


## Environment requirements

#### Docker:

**Minimum version:** 17.03.0 .

To check docker version run in console `docker -v` .

For further informations follow "[How to install docker](https://www.docker.com/community-edition#/download)" instructions.

#### Docker Compose:

**Minimum version:** 1.16.0 .

To check docker-compose version run in console `docker-compose -v` .

For further informations follow "[How to install docker-compose](https://docs.docker.com/compose/install/)" instructions.


## Development Environment Installation

##### 1. Clone repository:

`git clone git@github.com:andreacasarin/oblatum.git`

##### 2. Go to project directory:

`cd oblatum`

##### 3. Define default env:

`cp .env.dist .env`

##### 4. Build dockerized application:

`docker-compose build`

###### 5. Run dockerized application:

`docker-compose up -d`

###### 6. Copy contracts definitions:

`cp blockchain/build/contracts/Deed*.json server/config/`

###### 7. Run sequelize migrations:

`docker-compose exec server sequelize db:migrate`

###### 8. Import sequelize seeds:

`docker-compose exec server sequelize db:seed:all`

##### 9. Check that the application is installed and configured correctly:

Open `http://localhost/` in a browser to see application running.

### React development server

##### 1. Start react development server to build fronted files and watch for changes:

`docker-compose exec web npm start`

##### 2. Check that react server is working:

Open `http://localhost:3000/` in a browser to see application running.

### Npm-watch build react

##### 1. Start npm-watch to build fronted files and watch for changes:

`docker-compose exec web npm watch`

##### 2. Check that auto reloading is working:

Open `http://localhost/` in a browser to see application running.


## Tests

###### Run unit tests:

`docker-compose exec server npm run test`

###### Run unit tests live:

`docker-compose exec server npm run test-watch`

###### Run code coverage tests:

`docker-compose exec server npm run coverage`

###### Run linter:

`docker-compose exec server npm run linter`


## Project FAQ

###### Start application after installation:

`docker-compose up -d`

###### Stop application:

`docker-compose stop`

###### Rebuild application application:

`docker-compose stop`

`docker-compose rm`

`docker-compose build --no-cache`

`docker-compose up -d`

Complete all initialization steps again if required (like re-configuring tests).

###### Run bash on server container:

`docker-compose exec server bash`

###### Install new node server dependencies:

`docker-compose exec server npm install`

###### Update node server dependencies:

`docker-compose exec server npm update`
