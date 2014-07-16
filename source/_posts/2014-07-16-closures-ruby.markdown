---
layout: post
title: "Understanding Closures"
date: 2014-07-16 12:12:48 -0400
comments: true
categories: [Closures, Ruby, JavaScript]
---
As I continue to learn JavaScript, I continue to run in to closures. And while I had some understanding of what that word means, when I came across <a href="http://www.skorks.com/2010/05/closures-a-simple-explanation-using-ruby/">this blog post</a> from <a href="https://twitter.com/skorks">Alan Sorkin</a>, it helped clear a few things up. This post focuses on closures in Ruby, hopefully in a way that illustrates the concept of closures more generally, irrespective of language.

<h3>Closures defined</h3>
Sorkin defines closures as follows:
{% blockquote Alan Sorkin http://www.skorks.com/2010/05/closures-a-simple-explanation-using-ruby/  Closures – A Simple Explanation (Using Ruby)  %}
A closure is basically a function/method that has the following two properties:
    - You can pass it around like an object (to be called later)
    - It remembers the values of all the variables that were in scope when the function was created. It is then able to access those variables when it is called even though they may no longer be in scope.
{% endblockquote %}

This is much clearer than the other definitions we sometimes hear, which Sorkin alludes to as (1) "In computer science, a closure is a first-class function with free variables that are bound in the lexical environment" or (2) "A closure is a function that is said to be 'closed over' its free variables". As we'll see, these definitions have value, but what exactly do they mean? Let's look at some code.

<!--more-->
<h3>Code example in Ruby</h3>

``` ruby SomeClass of Closures
class SomeClass
  def initialize(value1)
    @value1 = value1
  end
 
  def value_printer(value2)
    lambda {puts "Value1: #{@value1}, Value2: #{value2}"}   #=> create closure using a lambda
  end
end
 
def caller(some_closure)
  some_closure.call
end
 
some_class = SomeClass.new(5)
printer = some_class.value_printer("some value)
 
caller(printer)
```

When executed, this code prints: <code>Value1: 5, Value2: some value</code>. So what's going on here? As Sorkin describes, "the <code>value_printer</code> function creates a closure, using the lambda construct, and then returns it. We then assign our closure to a variable and pass that variable to another function, which then calls our closure. This satisfies the first property of a closure – we can pass it around."

Furthermore, "when we called our closure, we printed out <code>5</code> and <code>some value</code>. Even though both the <code>@value1</code> and <code>value2</code> variables were both well and truly out of scope in the rest of the program when we finally called the closure; inside the closure they were still in scope as it retained the state of all the variables that were in scope when it was defined. And so, our lambda satisfies the second property also which makes it a closure."

To the earlier point, we can now better understand the technical definitions. First-class function: a function that can be passed around like an object. Lexical environment: variables that are defined in the closure's scope. These are what make a closure a closure.

<h3>Why?</h3>
This made closures a lot clearer to me, but a question remained: why? What are some use cases for this pattern? Sorkin argues that closures are especially useful in functional languages (which are inherently stateless) because "we can use closures to essentially store some state which will persist as long as our closure lives on (i.e. if the closure changes the value of a variable it will retain the new value the next time the closure is invoked)." This enables us to <strong>do more with less code</strong>.

In non-functional languages? Also to do more with less code. Closures in Ruby come in the form of blocks, lambdas (as in the code example above), and blocks, all of which provide advantages in refactoring, customization, iterating across collections, managing resources, and enforcing policy. There are a number of use cases, some of which are described in <a href="http://www.technicalecstasy.net/closures-in-ruby-blocks-procs-and-lambdas/">this overview</a>.

<h3>Resources</h3>
<ul>
  <li><a href="http://www.skorks.com/2010/05/closures-a-simple-explanation-using-ruby/">Closures – A Simple Explanation (Using Ruby)</a></li>
  <li><a href="http://innig.net/software/ruby/closures-in-ruby">Closures in Ruby: Blocks, Procs and Lambdas</a></li>
  <li><a href="http://www.technicalecstasy.net/closures-in-ruby-blocks-procs-and-lambdas/">Closures in Ruby</a></li>
</ul>