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

##### 6. Check that the application is installed and configured correctly:

Open `http://localhost/` in a browser to see application running.


## Tests

###### Run unit tests:

`docker-compose exec app npm run test`

###### Run unit tests live:

`docker-compose exec app npm run test-watch`

###### Run code coverage tests:

`docker-compose exec app npm run coverage`

###### Run linter:

`docker-compose exec app npm run linter`


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

###### Run bash on app container:

`docker-compose exec app bash`

###### Install new node dependencies:

`docker-compose exec app npm install`

###### Update composer dependencies:

`docker-compose exec app npm update`

###### Run sequelize migrations:

`docker-compose exec app sequelize db:migrate`

###### Import sequelize seeds:

`docker-compose exec app sequelize db:seed:all`
