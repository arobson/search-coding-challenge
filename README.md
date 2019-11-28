# Search Demo

## Prerequisites

You will need SqlLite 3.30.1 on your system, Node 10.x, and npm.

## Installation

The following series of commands will:

    * clone the repository and move into that directory
    * install the CLI command into your environment
    * run the tests plus a coverage report
    * start the localhost (so the cli can talk to it)

```
git clone git://github.com/arobson/search-coding-challenge
cd ./search-coding-challenge
npm i . -g
npm test
npm start
```

> Note: after the install completes the first thing that will happen is that the database will created and populated. The schema will get defined and then seeded with JSON files derived from the original JSON (jq was used for this). If this does not happen correctly (the tests will fail), please run `npm run init-db`.

## Assumptions

 * It's good to use readily available and existing technology
 * Building exact value matching from scratch is probably not very valuable
 * It's better to show ability building:
    * HTTP services
    * CLI tooling
    * Solutions using available tech
 * It's ok if some aspects aren't capable of indefinite scale (Sqlite)

## Technology

 * Node.js (10)
    * knex - a lib for talking to various databases
    * fastify - http lib
    * fastify-knex - makes knex available to fastify app
    * yargs - CLI arg parsing
    * inquire - interactive CLI features
 * Sqlite3

## Design

### HTTP API

The general approach in use here is to provide a URL for each resource (user, organization, ticket) and allow the user to supply search criteria via query parameters.

An `OPTIONS` query against any given resource will reply with the underlying data structure definition for that resource. This is especially useful for building clients, which can determine aspects of their interface depending on what is in the data.

___Example___:
```
OPTIONS http://localhost/user
```

### General Search API

The search endpoints require 3 arguments to function correctly:

 * `field` - the name of the field to search against
 * `op` - the nature of the operation (`=`,`like`, etc.)
 * `value` - the value to use in the search

With these three operators, the server will build a valid query to search against.

#### Searching Users

`GET http://localhost/user?field=name&op==&valperson`

#### Searching Organizations

`GET http://localhost/organization?name=spamco`

#### Searching 

`GET http://localhost/ticket?title=what`

### CLI Client


#### Search: `./bin/cli.js search`

The client will prompt you for your inputs and print the result.

## Notes

 * I was unfortunately short on time so I had to take some short cuts
   * insufficient test coverage
   * cut corners in some configuration areas
 * This would benefit from better server API validation with something like JOI or using `fastify-schema`
 * I didn't have time to align the columns
 * Interaction could be a lot better.

### What If I don't Want the CLI Installed?

You can run `npm i` instead but you will need to run the CLI via `./bin/cli.js` anywhere you would have typed `zds` instead.