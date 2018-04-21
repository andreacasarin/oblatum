## Oblatum

#### Think big
Oblatum mission is to organize the world’s asset in a transparent and secure way that enables people prosperity and promote financial inclusion.

#### Start small
We have chosen to start from tracing bicycle. We leverage the Ethereum blockchain to create a digital certificate associated with the bicycle which enhances transparency and prevents the reselling of stolen bicycles.

#### Scale fast
Our solution can be easily applied to different assets and can be complemented with many different services attached to any registered asset. By relaying on the Ethereum blockchain we contribute to the Ethereum community, the most active community in the crypto-world, and we benefit from the open innovation.

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

## License

The MIT License

Copyright (c) 2010-2018 Oblatum. https://oblatum.it

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
