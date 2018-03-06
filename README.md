# cashflower-api
A simple Node.js API to manage transactions.

## Getting started

To run this API you will need:

- Node.js v6.11.x+
- MongoDB v3.6+

### Installing

Run `npm install` to install dependencies

### Start the database server

On the MongoDB /bin folder

```
mongod --dbpath ../data
```

### Start the server

```
npm start
```

API will run on `http://localhost:3001/api`

## Folder Structure
- **/app** - Application specific code
    - **/api**
        - **/transaction** - Transaction Domain
- **/bin** - Server execution code
- **/config** - General configuration of the server
    - **/database** - Database configuration
    - **/middleware** - Custom server middleware
- **/routes** - Routing specific code. This folder maintains the same structure of available routes.

## Available Routes

### GET /api/transaction
Retrieve transactions.

You can use the *Link* header for pagination reference (first, previous, next and/or last pages).

#### Optional query string parameters
- paymentType: (money|credit)

Filter by payment type.

- startDate: Number

Get transactions that were created after *startDate*. Parameter must be a date in milliseconds.

- endDate: Number

Get transactions that were created before *endDate*. Parameter must be a date in milliseconds.

- page: Number

Page of transactions to retrieve.

- limit: Number

Number of transactions per page.

- sort: String

Pass the name of the fields you want to sort. Use a '-' to sort on descending order. 

E.g.: -amount,description will sort by amount on descending and description on ascending order.

### POST /api/transaction
Create a new transaction.

### PUT /api/transaction/:id
Update a transaction with the corresponding *id*.

### DELETE /api/transaction/:id
Delete a transaction with the corresponding *id*.

## Information for Developers

#### Development Server

To save some time while developing, you can use the development server which automatically reloads once a file is changed.

```
npm run dev
```

#### Enabling the logger

To enable all application loggers just set the `DEBUG` environment variable before running the server.

```
On Windows:
set DEBUG=cashflower-api:*

On *nix:
export DEBUG=cashflower-api:*
```

For more information about the logger, take a look at the docs of the [debug] module.

#### Testing

```
npm test
```

This script will run all the test suites in the project.

#### Linting

This project uses [Standard] style. Run the linter with:

```
npm run lint
```

[Standard]: https://standardjs.com/
