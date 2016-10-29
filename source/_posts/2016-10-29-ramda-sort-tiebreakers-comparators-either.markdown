---
layout: post
title: "Ramda.js array sorting (with tiebreakers) using R.comparator, variadic R.either, and R.reduce"
date: 2016-10-29 12:50:14 -0400
comments: true
categories: ["JavaScript", "Ramda", "Functional Programming"]
---
A recent exercise in data processing with [Ramda.js](http://ramdajs.com/): I wanted to sort an array of objects by their key/value pairs. More specifically, I wanted to sort an array that looked like this:

``` javascript
[
    {
        "code": "AUT",
        "gold": 9,
        "silver": 5,
        "bronze": 7
    },
    {
        "code": "USA",
        "gold": 9,
        "silver": 7,
        "bronze": 10
    },
    {
        "code": "EGY",
        "gold": 2,
        "silver": 3,
        "bronze": 12
    }
]
```

A basic implementation is easy enough:

``` javascript R.sortBy defaults to ascending order
R.sortBy(R.prop('silver'), array);  // [{"code": "EGY", "silver": 3}, {"code": "AUT", "silver": 5}, {"code": "USA", "silver": 7}]
```

`R.sortBy` sorts according to a given function, in this case `R.prop` (where `'silver'` could be substituted for any other property).

To ensure the order (ascending vs. descending), we can introduce `R.comparator`:

``` javascript R.comparator enforces descending order, but "AUT" and "USA" tie
const goldComparator = R.comparator((a, b) => R.gt(R.prop('gold', a), R.prop('gold', b)));
R.sort(goldComparator, array);    //  [{"code": "AUT", "gold": 9}, {"code": "USA", "gold": 9}, {"code": "EGY", "silver": 3}]

```

How can we handle tiebreakers? That is, as in the example abolve, what if two elements in the array have identical `gold` values and we attempt to sort by `gold` -- which should be sorted first? We can ensure a deterministic result with predictable tiebreaks using comparators and `R.either`.

``` javascript R.comparator enforces descending order and second R.comparator passed to R.either breaks ties
const goldComparator = R.comparator((a, b) => R.gt(R.prop('gold', a), R.prop('gold', b)));
const silverComparator = R.comparator((a, b) => R.gt(R.prop('silver', a), R.prop('silver', b)));

R.sort(R.either(goldComparator, silverComparator), array);    // [{"code": "USA", "gold": 9, "silver": 7}, {"code": "AUT", "gold": 9, "silver": 5}, {"code": "EGY", "gold": 2, "silver": 3}]
```

Finally, what if we need more than one tiebreaker? How do we handle objects that have identical `gold` AND `silver` values? `R.either` expects two arguments, so the solution is to create a variadic implementation of `R.either`, one that will accept an unknown number of arguments, so we can pass tiebreaker comparators for all possible situations:

``` javascript Addresses all edge cases: sort by gold; if gold ties sort by silver; if silver ties sort by bronze; if bronze ties sort by country code
const variadicEither = (head, ...tail) => R.reduce(R.either, head, tail);

const goldComparator = R.comparator((a, b) => R.gt(R.prop('gold', a), R.prop('gold', b)));
const silverComparator = R.comparator((a, b) => R.gt(R.prop('silver', a), R.prop('silver', b)));
const bronzeComparator = R.comparator((a, b) => R.gt(R.prop('bronze', a), R.prop('bronze', b)));
const codeComparator = R.comparator((a, b) => R.lt(R.prop('code', a), R.prop('code', b)));    // sorts alphabetically by country code

R.sort(variadicEither([goldComparator, silverComparator, bronzeComparator, codeComparator]), array);
```

The crux of this solution is `variadicEither`, a [variadic](https://en.wikipedia.org/wiki/Variadic_function) re-implementation of `R.either` that can accept a variable number of arguments. It uses `head` (first argument) and `...tail` (all remaining arguments) to reduce over all arguments and return a function that addresses all tiebreak possibilities. R.sort expects a comparator function, which `R.either` and `variadicEither` both return.

Of course this solution still has a bit of boilerplate (repetition of `R.comparator(...)`). For a reusable `sortByProps` implementation that takes an array of props and a list, see [this Ramda.js recipe](https://github.com/ramda/ramda/wiki/Cookbook#sort-a-list-by-array-of-props-if-first-prop-equivalent-sort-by-second-etc) that I recently added.