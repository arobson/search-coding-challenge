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
npm run sever
```

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
    * flask - http lib
    * yargs - CLI arg parsing
    * inquire - interactive CLI features
    * knex
 * Sqlite3

## Design

### HTTP API

The general approach in use here is to provide a URL for each resource (user, organization, ticket) and allow the user to supply search criteria via query parameters.

An `OPTIONS` query against any given resource will reply with the underlying data structure definition for that resource. This is especially useful for building clients, which can determine aspects of their interface depending on what is in the data.

___Example___:
```
OPTIONS http://localhost/user
```

#### Searching Users

`GET http://localhost/user?name=person`

#### Searching Organizations

`GET http://localhost/organization?name=spamco`

#### Searching 

`GET http://localhost/ticket?title=what`

### CLI Client

## Notes

### What If I don't Want the CLI Installed?

You can run `npm i` instead but you will need to run the CLI via `./bin/cli.js` anywhere you would have typed `zds` instead.