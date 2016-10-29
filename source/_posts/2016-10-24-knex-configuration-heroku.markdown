---
layout: post
title: "Knexfile configuration for heroku deployment"
date: 2016-10-24 09:29:50 -0400
comments: true
categories: ["Knex", "Knexfile", "Database", "SQL", "PostgreSQL", "Heroku", "Deployments", "HTTP", "SSL"]
---
I recently deployed a simple Express server to Heroku. The project used [Knex.js](http://knexjs.org/) for SQL queries and database migrations. 

While deploying, I ran into some issues with my knexfile. That is, I was able to create the database using the Heroku CLI, but running the migrations and configuring the database connection took a bit of finessing.

Long story short, two parts:

<h3>1. Database URL (Connection)</h3>
Find your database url. Using Heroku CLI, running `heroku config` (or `heroku config --app [app name]`) will return something like the following:

```
cek app $ heroku config
=== app Config Vars
DATABASE_URL: postgres://asdghjlkjh:sadv09787-vnbmvliHJV@ec7-23-123-986-12.compute-1.amazonaws.com:5432/asfhlkjh1234
```

Copy and paste the DATABASE_URL as your Knexfile's `connection` value.

<h3>2. SSL</h3>

Heroku requires SSL for PostgreSQL connections. There are two options (and potentially a third in the future):

 - **(Confirmed)** Add an `ssl: true` key/value pair to the Knexfile
 - **(Confirmed)** Set an environment variable using Heroku CLI: `heroku config:set PGSSLMODE=require`
 - **(Unsupported, but may be implemented in future versions of Knex)** Add a `'?ssl=true'` query parameter to your database URL (knexfile's `connection`).

With those two things in mind, a Knexfile like the following will work just fine:

```
module.exports = {
    client: 'pg',
    debug: true,
    connection: DB_URL,
    migrations: {
        tableName: 'migrations'
    },
    ssl: true
}
```

<h3>Further resources:</h3>

 - [Related Github issue on Knex project](https://github.com/tgriesser/knex/issues/239#issuecomment-42278076)
 - [Heroku/Knex walkthrough](https://github.com/HalahRaadSalih/deploy-to-heroku-with-db)
 - [Similar issue](http://jakehp.github.io/2015/07/10/Knex-Postgres-Heroku/)