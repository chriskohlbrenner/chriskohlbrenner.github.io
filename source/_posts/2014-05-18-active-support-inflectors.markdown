---
layout: post
title: "Bending Strings with ActiveSupport::Inflector"
date: 2014-05-18 13:32:15 -0600
comments: true
categories: active_support inflector strings ruby rails intro
---
Ever run into issues with strings? Problems like converting CamelCase to snake_case, pluralizing words, or making integers into ordinals? Inflectors give us an easy solution.

<a href="http://dictionary.reference.com/browse/inflection">{% img center /images/inflection_definition.png %}</a>

An 'inflector' is anything that applies 'inflection', from Latin for 'bending', meaning that it can bend strings. Conveniently, Rails provides a number of inflectors in the ActiveSupport::Inflector module. The entire ActiveSupport component to Rails is handy; <a href="http://guides.rubyonrails.org/active_support_core_extensions.html">this RailsGuide</a> is worth a read. That said, this post is a quick primer on the inflector methods in Rails.

<!--more-->

<h3>Set-up</h3>
Because ActiveSupport is a Ruby on Rails component, the ActiveSupport::Inflector will be available by default in Rails applications.[^1]

To use it outside a Rails app (in irb, for example), run: <code>require 'active_support/inflector'</code>. It's that simple.

<h3>Examples</h3>

<h5>Pluralize and Singularize</h5>
These two methods, inverses of each other, adjust the pluralization of nouns.

{% include_code inflectors/pluralize_singularize.rb %}

<strong>Note</strong>: <code>pluralize</code> can be passed an integer as an optional argument, which pluralizes the string unless the argument is 1.

<h5>Camelize and Underscore</h5>
Another set of two inverses, <code>camelize</code> and <code>underscore</code> assist in formatting strings (names of methods vs. classes, for example).

{% include_code inflectors/camelize_underscore.rb %}

<strong>Note</strong>: <code>camelize</code> can be passed the optional argument <code>:lower</code> to make the first letter lowercase.

<h5>Assorted others</h5>
There are a lot of other helpful inflector methods, all of which are detailed in Rails documentation. A quick definition of the others:<ul>
<li><code>titleize</code>: capitalizes each word of the receiver string.</li>
<li><code>dasherize</code>: replaces underscores with dashes.</li>
<li><code>demodulize</code>: given a qualified constant name (<code>"ActiveSupport::Inflector"</code>), it returns the constant name, the rightmost part (<code>"Inflector"</code>).</li>
<li><code>deconstantize</code>: like <code>demodulize</code>, but <strong>removes</strong> the righmost part (i.e., <code>"ActiveSupport::Inflector"</code> to <code>"ActiveSupport"</code>.</li>
<li><code>constantize</code>: resolves the constant reference, or raises <code>NameError</code> if no such constant has been initialized.</li>
<li><code>parameterize</code>: normalizes the receiver for use in urls.</li>
<li><code>tableize</code>: <code>underscore</code> followed by </code>pluralize</code>, for use in naming tables.</li>
<li><code>classify</code>: inverse of <code>tableize</code>, returns singularized and camelized.</li>
<li><code>humanize</code>: replaces underscores with spaces, removes "_id" suffixes, and capitalizes first word.</li>
<li><code>foreign_key</code>: gives a foreign key column name from a class name.</li>
</ul>

Hopefully this was helpful, if for no other reason than a quick reference or refresher on inflectors and/or to point you towards the ActiveSupport <a href="http://guides.rubyonrails.org/active_support_core_extensions.html">guide</a> and <a href="https://github.com/rails/rails/blob/26698fb91d88dca0f860adcb80528d8d3f0f6285/activesupport/lib/active_support/inflector/methods.rb#L111">key inflector methods</a>.

[^1]: <a href="http://guides.rubyonrails.org/active_support_core_extensions.html#active-support-within-a-ruby-on-rails-application">The exception</a> to this default is when <code>config.active_support.bare</code> is set to true in a Rails application.