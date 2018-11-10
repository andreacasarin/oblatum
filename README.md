# Oblatum

### Think big
Oblatum mission is to organize the world’s asset in a transparent and secure way that enables people prosperity and promote financial inclusion.

### Start small
We have chosen to start from tracing bicycle. We leverage the Ethereum blockchain to create a digital certificate associated with the bicycle which enhances transparency and prevents the reselling of stolen bicycles.

### Scale fast
Our solution can be easily applied to different assets and can be complemented with many different services attached to any registered asset. By relaying on the Ethereum blockchain we contribute to the Ethereum community, the most active community in the crypto-world, and we benefit from the open innovation.

## Installation

#### 1. Docker:

**Minimum version:** 17.03.0 .

To check docker version run in console `docker -v` .

For further informations follow "[How to install docker](https://www.docker.com/community-edition#/download)" instructions.

#### 2. Docker Compose:

**Minimum version:** 1.16.0 .

To check docker-compose version run in console `docker-compose -v` .

For further informations follow "[How to install docker-compose](https://docs.docker.com/compose/install/)" instructions.

#### 3. Clone repository:

`git clone git@github.com:andreacasarin/oblatum.git`

#### 4. Go to project directory:

`cd oblatum`

#### 5. Define default env:

`cp .env.dist .env`

#### 6. Build dockerized application:

`docker-compose build`

#### 7. Pre-start dockerized application:

`docker-compose up`

#### 8. Migrate smartcontracts:

`docker-compose exec blockchain bash`

#### 9. Copy contracts definitions:

`cp blockchain/build/contracts/Deed*.json server/config/`

#### 10. Run sequelize migrations:

`docker-compose exec server sequelize db:migrate`

#### ~~11. Import sequelize seeds~~:

~~`docker-compose exec server sequelize db:seed:all`~~

#### 12. Stop dockerized application:

`CTRL+c`

#### 13. Start background dockerized application:

`docker-compose up -d`

#### 14. Check that the application is installed and configured correctly:

Open `http://localhost/` in a browser to see application running.

## Usage

#### Run unit tests:

`docker-compose exec server npm run test`

#### Run unit tests live:

`docker-compose exec server npm run test-watch`

#### Run code coverage tests:

`docker-compose exec server npm run coverage`

#### Run linter:

`docker-compose exec server npm run linter`

#### Rebuild application application:

`docker-compose build --no-cache`

#### Run bash on server container:

`docker-compose exec server bash`

#### Install new node server dependencies:

`docker-compose exec server npm install`

#### Start application after installation:

`docker-compose up -d`

#### Stop application:

`docker-compose stop`

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
