---
layout: post
title: "caching in rails"
date: 2014-05-12 11:11:54 -0600
comments: true
categories: Caching Cache Rails Memcached Intro
---
<strong>Summary</strong>: caching temporarily stores data so future requests don't take as much time. There are multiple caching techniques that can be easily implemented in Rails applications.

--------- 
<br>
Caching/cashing in Rails. I'm sure that's a pun that's never been made before.[^1] In this post, I overview the fundamental types of caching techniques, and walk through some effective ways of using them in Rails.

The first section covers some background on caching. If you prefer to skip that, jump straight to the <a href="/blog/2014/05/12/caching-in-rails#how-to">how-to section</a>.

<h2>Caching Background</h2>

<h3>Caching?</h3>
Caching defined:
{% blockquote Wikipedia http://en.wikipedia.org/wiki/Cache_(computing) "Cache (computing)" %}
In computing, a cache (/ˈkæʃ/ kash) is a component that transparently stores data so that future requests for that data can be served faster.
{% endblockquote %}

And why cache? According to <a href="http://guides.rubyonrails.org/caching_with_rails.html">the RailsGuide on the topic</a>, caching can help with "avoiding that expensive round-trip to your database and returning what you need to return to the web clients in the shortest time possible." So let's figure out how to avoid that expensive trip.

<!--more-->

<h3>Types of Caching</h3>
A few types of caching to know (going from highest to lowest level):
<ul>
  <li>
    <strong>HTTP Caching:</strong> HTTP caching occurs when the browser stores local copies of web resources for faster retrieval the next time the resource is required. It uses HTTP headers to determine if the browser can use a locally stored version of the response or if it needs to request a fresh copy from the origin server.
  </li>
  <li>
    <strong>Page Caching:</strong> Save entire pages of an application without hitting the stack by returning cached prerendered pages. Good in applications without authentication and other highly dynamic aspects.
  </li>
  <li>
    <strong>Action Caching:</strong> Works like Page Caching, except the incoming web request hits the Rails stack. This means that before filters (like authentication or other restrictions) can be run on it before the cache is served.
  </li>
  <li>
    <strong>Fragment Caching:</strong> Allows fragments of view logic, for example partials or other bits of HTML that are independent from other parts, to be wrapped in a cache block and served out of the cache store when the next request comes in.
  </li>
  <li>
    <strong>Rails.cache:</strong> All cached content except cached pages are stored in the Rails.cache.
  </li>
</ul>


<h3>Specifics in Rails</h3>
Note that I said these go from highes to lowest level. More specifically, these techniques build on top of each other. HTTP and Page Caching are unique in that they do not use Rails.cache, but the rest build on top of each other (Action Caching depends on Fragment Caching, which depends on Rails.cache).

Even more specifically, it is ActiveSupport::Cache that provides the foundation for interacting with the cache in Rails. The ActiveSupport::Cache module includes multiple classes, each a different cache store:[^2]
<ul>
  <li>ActiveSupport::Cache::Store</li>
  <li>ActiveSupport::Cache::MemoryStore</li>
  <li>ActiveSupport::Cache::FileStore</li>
  <li>ActiveSupport::Cache::MemCacheStore</li>
  <li>ActiveSupport::Cache::EhcacheStore</li>
  <li>ActiveSupport::Cache::NullStore.</li>
</ul>
MemCacheStore is most popular for large production websites. Custom cache stores can be created by extending ActiveSupport::Cache::Store and implementing the appropriate methods.

<h2 id="how-to">How To</h2>

<h3>How to Cache in Rails</h3>
So Rails has a lot of [active] support for caching built in, but how do we use it? I'll quote Ryan Bates on this one:
{% blockquote RailsCasts http://railscasts.com/episodes/380-memcached-dalli "#380 Memcached & Dalli" %}
Rails’ cache store functionality is very modular. It uses the file system to store the cache by default but we can easily change this to store it elsewhere. Rails comes with several cache store options that we can choose from. The default used to be a memory store which stored the cache in local memory of that Rails process. This issue with this is that in production we often have multiple Rails instances running and each of these will have their own cache store which isn’t a good use of resources. The file store works well for smaller applications but isn’t very efficient as reading from and writing to the hard drive is relatively slow. If we use this for a cache that’s accessed frequently we’d be better off using something else.

This brings us to the memcache store which offers the best of both worlds.
{% endblockquote %}

Taking Ryan's advice, let's jump straight to ActiveSupport::Cache::MemCacheStore.

<h3>Memcached and Dalli</h3>
According to <a href="http://memcached.org/">its website</a>, Memcached is:
<ul>
  <li>Free & open source, high-performance, distributed memory object caching system, generic in nature, but intended for use in speeding up dynamic web applications by alleviating database load.</li>
  <li>Memcached is an in-memory key-value store for small chunks of arbitrary data (strings, objects) from results of database calls, API calls, or page rendering.</li>
  <li>Memcached is simple yet powerful. Its simple design promotes quick deployment, ease of development, and solves many problems facing large data caches. Its API is available for most popular languages.</li>
</ul>
Memcached works well in combination with <a href="https://github.com/mperham/dalli">Dalli</a>, "a high performance pure Ruby client for accessing memcached servers".

-----
<h5>Set-up</h5>
If you don't already have memcached installed (it's preinstalled on OS X), you can run <code>brew install memcached</code>, and add <code>gem 'dalli'</code> to your Gemfile. Dalli is default in Rails 4 (but still needs to appear in the Gemfile).

Next, set up the development config file (/config/development.rb) as follows:
{% include_code dalli_development.rb %}

Run <code>memcached</code> from the terminal to start a memcached server. If you see <code>DalliError: No server available</code>, this is likely the problem.

You can now open a Rails console (<code>rails c</code>) and run <code>Rails.cache</code>, which should return an instance of DalliStore (like <code>#<ActiveSupport::Cache::DalliStore:0x00000105924a18 ...</code>).

At this point, to simulate the caching that one wuld implement on a web application, we can run <code>Rails.cache.write(:cache_key, "cache value")</code> (should return <code>Cache write: cache_key</code> and a long integer), followed by <code>Rails.cache.read(:cache_key)</code> (should return <code>"cache value"</code>). Of course, :cache_key and "cache value" can be replaced with any symbol (as key) and value you choose.

-----
<h3>Actual example</h3>
Imagine a web page that is a gallery of images. We want to save ourselves the long trip to the database everytime, and instead cache the images so that they render more quickly. How can we do this?

A simple controller, rendering an index page with all the images. Note line 2--this will store the page in a file-based cache separate from the Memcached cache store. This is because page caching is one of the few caching techniques that down not use the cache store.
{% include_code images_controller.rb %}

Layering on fragment caching in addition to or instead of page caching, we can go to the view, call <code>cache</code>, and pass a block. Everything inside the block will now be cached, namely each image. Pay attention to line 3--in addition to simply calling <code>cache</code>, we can pass certain options like <code>expires_in</code>. This helps Memcached serve its purpose as a <strong>temporary</strong> data store. If the data were intended to be persisted, it should be persisted to a traditional database.

{% include_code images_index.html.erb %}

And there you have it! A simple caching solution to a slow-loading page. We could continue even deeper to caching at the model level, but fragment caching at the view level suffices as a simple solution.

Of the five types of caching I introduced at the beginning of this post, I've covered three: page caching, fragment caching, and Rails.cache. For more on the other two, see the resources below.

<h3>Resources</h3>
Some further reading, which informed this blog post:
<ul>
  <li><a href="http://railscasts.com/?tag_id=18">RailsCasts.</a> Some specifics:
    <ul>
      <li>#89 - <a href="http://railscasts.com/episodes/89-page-caching-revised">Page Caching</a></li>
      <li>#90 - <a href="http://railscasts.com/episodes/90-fragment-caching-revised">Fragment Caching</a></li>
      <li>#93 - <a href="http://railscasts.com/episodes/93-action-caching">Action Caching</a></li>
      <li>#115 - <a href="http://railscasts.com/episodes/115-model-caching-revised">Model Caching</a></li>
      <li>#169 - <a href="http://railscasts.com/episodes/169-dynamic-page-caching-revised">Dynamic Page Caching</a></li>
      <li>#321 - <a href="http://railscasts.com/episodes/321-http-caching">HTTP Caching</a></li>
      <li>#380 - <a href="http://railscasts.com/episodes/380-memcached-dalli">Memcached & Dalli</a></li>
    </ul>
  </li>
  <li>RailsGuide: <a href="http://guides.rubyonrails.org/caching_with_rails.html">Caching with Rails: An overview</a></li>
  <li>Heroku Dev Center: <a href="https://devcenter.heroku.com/articles/caching-strategies">Caching Strategies for Rails</a></li>
  <li>Codelearn: <a href="http://www.codelearn.org/blog/rails-cache-with-examples">Rails Cache for Dummies</a></li>
  <li>Adam Hawkins: <a href="http://hawkins.io/2011/05/advanced_caching_in_rails/">Advanced Caching in Rails</a></li>
</ul>


<h3>Footnotes:</h3>
[^1]: <a href="https://www.google.com/search?btnG=1&pws=0&q=cashing+caching">It has.</a>
[^2]: The <a href="http://api.rubyonrails.org/classes/ActiveSupport/Cache.html">ActiveSupport::Cache documentation</a> gives a good overview of the entire module and its subclasses.