---
layout: post
title: "Testing, Low- to High-Level"
date: 2014-06-24 14:32:42 -0400
comments: true
categories: [Rails, Testing, Tests, RSpec, Cucumber, Ruby]
---
Google "low level" and you'll see the following definition.

{% img right /images/low-to-high-testing/low-level.png 400 %}

We often hear about low-level languages like Assembly or C (which was once a high-level language) vs. high-level languages like Java or Ruby (which may come to be considered low-level?).

Applying that same logic to testing, this blog post covers the various types of tests for Rails applications, working its way up from low-level unit tests up to high-level acceptance tests, with functional and integration tests in between. Along the way, I'll reference examples of tests I wrote for a side project: my <a href="http://world-cup-14.herokuapp.com/">World Cup tracker</a>.

<!--more-->

<h3>Unit Tests (Model Tests)</h3>
The <a href="http://guides.rubyonrails.org/testing.html">Rails Guide on testing</a> describes unit tests as "what you write to test your models." It continues, "It's a good practice to have at least one test for each of your validations and at least one test for every method in your model."



I won't get into FactoryGirl in detail, but here I create a factory for the Team model, which I use instead of fixtures as test data for team_spec.rb.

{% include_code low-to-high-testing/teams_factory.rb %}
{% include_code low-to-high-testing/team_spec.rb %}

<h3>Functional Tests (Controller Tests)</h3>
The testing RailsGuide explains, "In Rails, testing the various actions of a single controller is called writing functional tests for that controller. Controllers handle the incoming web requests to your application and eventually respond with a rendered view." RSpec's documentation explains "A controller spec is an RSpec wrapper for a Rails functional test." So functional tests and controller tests are synonymous.

The main purpose of functional tests, as the quote above makes clear, is to ensure that individual controllers handle requests appropriately and render the proper view. This can mean testing <a href="http://guides.rubyonrails.org/testing.html#what-to-include-in-your-functional-tests">the following</a>:

* Was the web request successful?
* Was the user redirected to the right page?
* Was the user successfully authenticated?
* Was the correct object stored in the response template?
* Was the appropriate message displayed to the user in the view?

In the following example, I simply test that TeamsController assigns the correct resources (teams) and renders the correct views on get requests.
{% include_code low-to-high-testing/teams_controller_spec.rb %}

<h3>Integration Tests (Acceptance Tests)</h3>
Depending who you ask, integration tests and acceptance tests are either identical or subtly different. They both test functionality from end-to-end (or close to it) and are both forms of black box testing, but acceptance tests have a customer orientation, whereas integration tests are written by developers for developers. The first five slides of <a href="http://www.slideshare.net/AlanHecht/integration-and-acceptance-testing">this talk</a> provide a helpful summary.

The testing RailsGuide defines integration tests as intended to test "the interaction among any number of controllers. They are generally used to test important work flows within your application." The "important work flows" are the key; integration tests should test the application from end-to-end--across multiple models, controllers, and views--to ensure that the application works "in integration".

ExtremeProgramming.org defines acceptance tests as follows: "Acceptance tests are created from user stories. During an iteration the user stories selected during the iteration planning meeting will be translated into acceptance tests. ... Acceptance tests are black box system tests. Each acceptance test represents some expected result from the system." Another key: black box testing, testing an for the proper output given a certain input, without knowing what happens inside the "black box" (that's what unit and functional tests are for).

{% include_code low-to-high-testing/team_index_spec.rb %}


<h3>Conclusion</h3>
CodeClimate describes what they call <a href="http://blog.codeclimate.com/blog/2013/10/09/rails-testing-pyramid/">the Rails Testing Pyramid</a>, depicted below:

{% img left http://blog.codeclimate.com/images/posts/rails-testing-pyramid.png 400 %}

They write, "Blending unit tests, service-level tests and acceptance tests yields faster test suites that still provide confidence the application is working, and are resistant to incidental breakage. As you develop, take care to prune tests that are not pulling their weight. When you fix a bug, implement your regression test at the lowest possible level. Over time, keep an eye on the ratio between the counts of each type of test, as well as the time of your acceptance test suite."

In the case of the Team resource in my World Cup app, my ratio was 1 integration test:3 functional tests:5 unit tests--a perfectly pyramidal ratio if you ask me! Of course, this is a simple example, but it illustrates the goal for a test suite more generally.

<h3>Resources</h3>

* <a href="http://betterspecs.org/">BetterSpecs</a>
* <a href="https://github.com/thoughtbot/factory_girl">FactoryGirl</a>
* <a href="http://guides.rubyonrails.org/testing.html">RailsGuides: A Guide to Testing Rails Applications</a>
* "How I learned to test my Rails applications" (Part <a href="http://everydayrails.com/2012/03/12/testing-series-intro.html">1</a> | <a href="http://everydayrails.com/2012/03/12/testing-series-rspec-setup.html">2</a> | <a href="http://everydayrails.com/2012/03/19/testing-series-rspec-models-factory-girl.html">3</a> | <a href="http://everydayrails.com/2012/04/07/testing-series-rspec-controllers.html">4</a>)