---
layout: post
title: "Translating Verbs: CRUD, SQL, and HTTP"
date: 2014-06-20 17:12:40 -0400
comments: true
categories: [SQL, Database, CRUD, HTTP, HTTP verbs, Rails]
---
Recently I was asked two interview questions about basic CRUD functions, specifically (1) how they correspond to HTTP verbs and (2) how to perform those actions on the database side with SQL statements.

I was able to list the HTTP verbs relatively quickly. I've built enough simple CRUD applications in Rails to know <a href="http://guides.rubyonrails.org/routing.html#crud-verbs-and-actions">the CRUD operations as they relate to creating, reading, updating, or deleting database records</a>.

On the other hand, it took me a second to recall the SQL statements. Crud. I remember hearing at Flatiron that a shortcoming of many junior developer candidates is SQL, that they don't know to retrieve a record with <code>SELECT expression FROM table WHERE conditions;</code>.

I remember thinking "I know my SQL--I'll never run into such a problem." Well, I almost did! It's amazing how easy it is to forget even the most basic syntax when you don't use it. So I'll be sure to commit the following table to memory:

| CRUD            | SQL         | HTTP         |
| --------------- | ----------- | ------------ |
| Create          | INSERT      | Put/Post
| Read (Retrieve) | SELECT      | Get
| Update (Modify) | UPDATE      | Put/Patch
| Delete (Destroy)| DELETE      | Delete