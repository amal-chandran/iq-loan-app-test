## Loan Book

A simple loan management application with three "customer", "agent" and "admin". The application implements the Authentication and Authorization of users. Provides a dashboard and API to manage the loans.

<img src="https://github.com/adevofficial/iq-loan-app-test/blob/main/images/admin-dashboard.png?raw=true"/>

## Requirements

- Node.Js (12.x.x)
- Npm (6.14.5)
- Postgres (10)
- build-essential(in Ubuntu/Linux)

  OR

- Docker (19.03.13)
- Docker-Compose (1.26.2)

## Setup

- Open to start http://localhost:3000
- API Endpoint http://localhost:8000

**Docker Setup**

To Run

- `docker-compose up --no-deps --force-recreate --build`
- `docker-compose down`

To Test

- `docker-compose -f docker-compose-test.yaml up --no-deps --force-recreate --build`
- `docker-compose down`

**Normal Setup**

Need node.js,postgres,build-essential,npm

To Run

- Starting API in One Terminal
- `cd api && npm install` - To open api and install packages
- `npm run db:clean` - To drop existing db and create new db
- `npm run db:preload` - To run migrations and seeds
- `npm run start:dev` - to start dev server on 8000

- Starting UI Server in another Terminal
- `cd client && npm install` - To open client and install packages
- `npm start` - To start dev server 3000

To Test

- Starting API in One Terminal
- `cd api && npm install` - To open api and install packages
- `npm test` - To create new db and run test

## Credentials

**Admin**

Email: `amal-admin@gmail.com`

Password: `#adevofficial`

**Agent**

Email: `amal-agent@gmail.com`

Password: `#adevofficial`

**Customer**

Email: `amal-customer@gmail.com`

Password: `#adevofficial`

**Customer-2**

Email: `amal-customer-2@gmail.com`

Password: `#adevofficial`
