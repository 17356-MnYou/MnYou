# MnYou

A menu generator for restaurants.

## Client

### Installing

Run `npm install`

Make sure that `./client/.env` file has all of the environment variables set. You can find the `.env.example`
file in `./client/.env.example`.

### Running

Run `npm run start`

## Server

### Installing

#### NPM

Run `npm install`

#### Database

If you are running this locally for development, you can use any `postgres` database like `psql` or
any online solution.

Make sure that `./server/.env` file has all of the environment variables set. You can find the `.env.example`
file in `./server/.env.example`.

Once you have the database setup, make sure that it is live while you are running the backend.
Run `npm run db:push` and accept all the changes. Make sure that your database is empty when doing
this or if you're iterating on the schema to make sure that the migrations are plausible.

### Running

Run `npm run dev`

## NOTE

These both run on `localhost:3000` so one of them is going to automatically be sent to port `3001`.
Remember this when setting the `.env` file for the `client`. Otherwise, you can just change the port
used on the `server` in its `.env` file too.
