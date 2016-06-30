---
layout: post
title: "PostCSS to Use a Single Set of Color Variables (for both JS and CSS)"
date: 2016-06-30 08:05:35 -0400
comments: true
categories: 
---

In this post, I describe how to create a single list of color variables (in JavaScript) so that those colors can be shared across JavaScript files and CSS stylesheets. Using PostCSS within a Webpack app, I outline the problem of sharing styles between CSS and JS and how it can be solved. For step-by-step code examples, skip ahead to "Enter PostCSS (Problem Solved)".

<h3>The Problem We're Solving</h3>

At my day job, we'd had a `colors.css` file for a while, where we define all the hex codes for our color scheme, as defined by our designers. It looked something like this:

{% include_code postcss/colors.css %}

This enabled us to use the same colors in any of our other CSS files using CSS modules:

{% include_code postcss/component-specific.css %}

Straightforward, keeps things DRY, makes it easy to change colors when it strikes the designer's fancy, etc.

For a long time, while our CSS colors were nicely organized, our JS colors weren't. We have colors in our D3 visualizations and our inline styles on React components. As a simple improvement, I decided to pull all our colors into a single map that could be read by both our CSS and JS files. *NB*: this post is about CSS _colors_, but can apply to any CSS variables you'd like shared to JS.

<!--more-->

<h3>Enter PostCSS (Problem Solved)</h3>

[PostCSS](https://github.com/postcss/postcss) does a lot of things. I'll leave it as an exercise to the reader to explore the [various plugins](https://github.com/postcss/postcss/blob/master/docs/plugins.md) (or just [some of the most popular ones](https://github.com/postcss/postcss#plugins)).

For my purposes, I needed [postcss-loader](https://github.com/postcss/postcss-loader) (a loader for Webpack), [postcss-cssnext](https://github.com/MoOx/postcss-cssnext) (enables the latest CSS syntax, which we were already using through [cssnext](http://cssnext.io/)), [postcss-url](https://github.com/postcss/postcss-url), and [postcss-import](https://github.com/postcss/postcss-import).

The change was effectively X steps (X easy steps to a single list of color variables!):

<ol>
  <li>
    Add PostCSS plugins to package.json:

    {% include_code postcss/package.json %}
  </li>

  <li>
    Since I had previously been using cssnext, I followed [these migration steps](http://cssnext.io/postcss/#postcss-loader) to upgrade to postcss-cssnext. This meant swapping the `cssnext-loader` for `postcss-loader` in my Webpack loaders, removing cssnext from my webpack config, and adding the postcss options to webpack config:

    {% include_code postcss/webpack.config.js %}
  </li>

  <li>
    Add a colors.js. I chose to CONSTANT_CASE the variables (for idiomatic JS).

    {% include_code postcss/colors.js %}
  </li>

  <li>
    Require `colors.js` in webpack.config.js.

    {% include_code postcss/require-colors.js %}
  </li>

  <li>
    (OPTIONAL) Because I wanted CSS variables to be lowercase and hyphen-separated so I could maintain our old `color: var(--light-grey);` syntax, I added a transformation from the constant case (using Ramda's `curry` and `reduce`):

    {% include_code postcss/case-transform.js %}
  </li>
  
  <li>
    Go forth and use styles!
    
    {% include_code postcss/color-vars.js %}

    {% include_code postcss/color-vars.css %}
  </li>

</ol>

And that's it! Now, in addition to everything it already did, running `webpack-dev-server` will (1) compile using PostCSS, (2) read from colors.js, and (3) set all colors in colors.js as global CSS variables.

<h3>Limitations</h3>

The one limitation is hot-reloading. That is, hot reloading works perfectly on changes to JavaScript files and CSS files, with one exception: colors.js. Since colors.js is read on build, we need to restart the webpack dev server anytime we change or add a color variable. [This question](https://stackoverflow.com/questions/35174069/can-i-have-a-single-variables-file-using-cssnext-with-webpack) poses effectively the same issue ("...every time I change a variable I have to restart the webpack dev server"). For now, that's a tradeoff I can live with.

<h3>Parting thoughts</h3>

This new pattern enables much more inline styling with JavaScript. That is, now our React components and D3 visualizations can, in theory, read style variables from JavaScript and never know about CSS.

Following this to its extreme of no-CSS/all-JS may seem crazy, but I remain curious. [A lot](https://www.youtube.com/watch?v=ERB1TJBn32c) [has been](https://twitter.com/necolas/status/718517376711405568) [said](https://speakerdeck.com/vjeux/react-css-in-js) about how inline styles with JavaScript may be the future. At a minimum, it's convenient and fun to do more JS and less CSS. I'm excited to see how the community experiments with inline styling and if there come to be best practices around separation of concerns.