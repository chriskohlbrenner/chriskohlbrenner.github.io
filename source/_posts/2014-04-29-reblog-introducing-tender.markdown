---
layout: post
title: "Introducing Tender"
date: 2014-04-29 09:46:48 -0400
comments: true
categories: Reblog Portfolio
---
<strong>Note:</strong> This post is a reblog. It originally appeared on <a href="http://squarecraft.co/blog/introducing-tender">Alex Patriquin's blog</a>.

<!--more-->

<h1>Introducing Tender</a></h1>
It's been a few weeks since I last posted, as I've been über busy. In the final month of The Flatiron School, my fellow students and I were in an all-out sprint to build and launch our apps at the Science Fair, a kind of show-and-tell for our projects and the culmination of all our Ruby, Rails and Javascript training over the three month program.

The Science Fair was a resounding success and I'm excited to share the first app that I worked on: Tender, a Venmo for Bitcoin. How's how my teammate and I made Tender.

{% img /images/tender-main.png %}

<h2>Tender</h2><a href="http://www.tendermessenger.com/">Tender</a> (<a href="https://github.com/alexpatriquin/BitcoinMessenger">Github</a>) is a social payments app (think Venmo) for Bitcoin. Users can send or receive any amount of Bitcoin, including extremely small amounts which can be used to validated the identity of counter-parties. Tender also comes with an inbox/outbox for messages.

I built Tender with my fellow Flatiron student <a href="https://twitter.com/CKohlbrenner">Chris Kohlbrenner</a>. I came up with the initial idea for the project as a Bitcoin dating site... hence the triple-play on words with the name "Tender". However, we decided to generalize the app and make it usable (or at least instructive) for other open source projects as a general social messaging utility. </p><h3>Why Bitcoin Messaging?</h3><p>Bitcoin gets a lot of hype these days, but after working with the cryptocurrency a bit, I really do see its potential to transform online payments and <a target="_blank" data-cke-saved-href="http://blog.pmarca.com/2014/01/22/why-bitcoin-matters/" href="http://blog.pmarca.com/2014/01/22/why-bitcoin-matters/">much more</a>. For example, a messaging system can require a very small amount of Bitcoin get sent with each message as a way to prevent or at least deter bulk volume spammers. After practicing our web development skills, our main purpose in building Tender was to demonstrate this anti-spam concept.

We used Ruby on Rails as the framework and built the Bitcoin transactions features with the Coinbase API and the messaging functionality with a gem called Mailboxer. In the process of weaving those two features together, we learned a lot about them. Payments and messaging share the concept of "credits" and "debits" to a balance or mailbox. Kind of like double-ledger accounting, we had to do a credit and a debit whenever a user sent money and a message to another user, and vice-versa. You can see that code play out in the snippet below.

<script src="https://gist.github.com/alexpatriquin/10937359.js"></script>

<h3>Coinbase and Typeahead.js</h3>
To build Tender, we used Devise and Omniauth to authenticate users, enable them to sign in via Coinbase and to validate their balances on Coinbase. The app features a lot of validations and notices to users to confirm that their transactions go through when they should and shows descriptive alerts when they shouldn't, such as when the user has insufficient Bitcoin balance.

We also made it easy for users to find each other by implementing an autosuggest user search feature with Twitter's Typeahead.js, and brought the user objects to the views with the gon gem. Finally, Tender features a robust testing suite with Rspec and Capybara, at 92% code coverage.

This was a very interesting project on many levels, from working with a new payment type like Bitcoin, to getting deep into the mechanics of messaging. I also learned quite a bit about implementing complex Javascript features in Rails.