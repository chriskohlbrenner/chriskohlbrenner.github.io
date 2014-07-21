---
layout: post
title: "Intro to JavaScript (according to Douglas Crockford)"
date: 2014-07-21 12:21:55 -0400
comments: true
categories: 
---
<strong>Summary</strong>: I'm working my way through a few <a href="https://github.com/bolshchikov/js-must-watch">must-watch videos about JavaScript</a>. If you know JavaScript, pretend to know JavaScript, or hope to learn JavaScript, check out those videos. Or read this and the <a href="/blog/2014/07/21/javascripts-historical-context-crockford">previous post</a> (and save yourself three hours of video-watching), in which I pull some of my favorite quotes from what <a href="https://en.wikipedia.org/wiki/Douglas_Crockford">Douglas Crockford</a> has to say about JavaScript.

<strong>Notes</strong>: The quotes below represent some of the key statements (as I judge them) in order of their appearance in Crockford's <a href="http://youtu.be/RO1Wnu-xKoY">second talk</a> on JavaScript. Read together, they outline the main trajectory of Crokford's presentation, but they are not intended to replace the entirety of the talk.

<h3>Crockford on JavaScript's key features</h3>

<u><h5>JavaScript: The Bad Parts</h5></u>
"Since I discovered that the language had good parts, that sort of implies that it must have had bad parts. Why would anybody design a language with bad parts? How would that come about? In my review of all the bad parts in the language, it mostly comes from <strong>three causes</strong>. The first is <strong>legacy</strong>. In copying the Java syntax, JavaScript also copied some bad things about Java, so many of the worst features in JavaScript are actually things it inherited from Java, which it inherited from C, which it inherited from FORTRAN. So there’s a long line of sin-age which affects us today.

"There were some <strong>good intentions</strong> in the language that didn’t quite work out. Things were added, like semi-colon insertion and implied global variables, with the intention of making the language easier to use for beginners. In fact, it worked, because it turns out that if you have absolutely no idea what you’re doing in the language you can still generally make things work. Unfortunately, those things work against professional programmers trying to do large, sophisticated programs, so there are some trade-offs there that didn’t work out well for us.

"But the biggest influence, by far, was <strong>haste</strong>. The language was designed, implemented, and shipped in way too little time. Most languages take years to develop – for example, Smalltalk was eight years from Alan Kay’s first prototype to Smalltalk 80, when it was first made available to the public. That’s a good timeframe for a programming language, because you want to go through it and test it, make sure that it works, and refine it in order to make sure that it’s meeting its goals. JavaScript was prepared in about as many days." (<a href="http://youtu.be/RO1Wnu-xKoY?t=12m22s">Link</a>)

<!--more-->

<u><h5>JavaScript: The Good Parts</h5></u>
"The good news is that, for the most part, the bad parts can be avoided. And if you avoid the bad parts, and if you work just with what’s left over, <a href="http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742">the good parts</a>, there’s actually a brilliant language there. The features that were selected and the way that they were put together is astonishingly good. It’s a language of amazing expressive power. JavaScript is a language that most people don’t bother to learn before they use. You can’t do that with any other language, and you shouldn’t want to, and you shouldn’t do that with this language either. Programming is a serious business, and you should have good knowledge about what you’re doing, but most people feel that they ought to be able to program in this language without any knowledge at all, and it still works. It’s because the language has enormous expressive power, and that’s not by accident. <strong>There’s actually some brilliant design in there</strong>.

"The problem with the bad parts isn’t that they’re useless, it’s that they’re dangerous. I see a lot of wannabe ninjas out there who are going through the bad parts and going ‘oh, I found a new use for with, or another thing you can do with eval,’ or some other edge case. Stop doing that. Stop doing that!" (<a href="http://youtu.be/RO1Wnu-xKoY?t=14m44s">Link</a>)

<u><h5>Object-Oriented JavaScript</h5></u>
"<strong>This language is all about objects; it’s an object oriented language</strong>. I’ll try to demonstrate to you that it is more object oriented than Java. For a long time, a lot of the opinion about this language was that it’s not object oriented, it’s object based, it’s deficient. It turns out it’s actually a superior language.

"<strong>In this language, an object is a dynamic collection of properties. This is quite different than in most of the other object oriented languages in which an object is an instance of a class, where a class has some state and behavior. Objects in this system are much more dynamic</strong>. So it’s a collection of properties, and each property has a keystring which is unique within that object. If you add two properties with the same name, the second one will replace the first one." (<a href="http://youtu.be/RO1Wnu-xKoY?t=16m1s">Link</a>)

<u><h5>JavaScript accessor property (getter/setter)</h5></u>
"Here’s an example of using an <strong>accessor property</strong>. The difference between an accessor property and a data property is that an accessor property uses get and/or set. Here I’m defining a property for my object called inch. When I try to get inch, my_object, ’Inch’, I will receive the result of dividing this.mm by 25.4. If I try to set it, I won’t actually set this property, instead I will set millimeter to whatever value I pass times 25.4. So the result of this is that I can have an object with two properties in it that are linked in an interesting constraint way. I can set either the millimeters or the inch and it will appear to fix the other one, so I can keep those two things in sync. There are a lot of really interesting patterns that can be done with these. There are even more evil patterns that can be done with this.

"For example, one of the assumptions that you’ve always had in the language was that you can go to an object and retrieve a property and there’s no transfer of control, you’re just getting some data. Now you’re giving control over to a function which you hope will give it back, but it might not. But it can also mutate the object while it’s getting the thing, so something that used to be a read-only event is now potentially a mutating event which could mutate this object or who-knows-what in the thing. So there are all sorts of really abusive patterns that can be made out of these getters and setters, and I recommend to all the ninjas: don’t get stupid with stuff, because it’s going to be really, really easy to get stupid with this stuff. I’m telling you, you can get stupid with this stuff, and you don’t need to do it. So be smart with this. Use it sparingly." (<a href="http://youtu.be/RO1Wnu-xKoY?t=21m22s">Link</a>)

<strong>Example:</strong>
``` javascript Accessor property
myObject = {};

Object.defineProperty(myObject, 'inch', {
  get: function () {
    return this.mm / 25.4;
  },
  set: function (value) {
    this.mm = value * 25.4;
  },
  enumerable: true
});

myObject.inch = 10;
myObject;
  //  returns { inch: [Getter/Setter], mm: 254 }

```

<u><h5>Classes vs. Prototypes (prototypes!)</h5></u>
"The most controversial feature of the language is the way it does inheritance, which is radically different than virtually all other modern languages. <strong>Most languages use classes – I call them ‘classical languages’ – JavaScript does not. JavaScript is class free. It uses prototypes.</strong> For people who are classically trained who look at the language, they go: well, this is deficient. You don’t have classes, how can you get anything done? How can you have any confidence that the structure of your program’s going to work? And they never get past that.

"But it turns out classes as we currently understand them were first formulated in 1967, in Simula. The prototypal school was developed about 20 years later, at Xerox Parc, by people who had intimate knowledge of Smalltalk, which was the first modern semi-popular object oriented programming language. <strong>The changes that they made were not made in ignorance; it was very well informed, changing, simplifying, and advancing the programming model. And what they did was they created, in my view, a vast improvement over the model that had come before</strong>.

"It’s possible that one demonstration of the greater power of the new thing is that, first off, <strong>code is smaller</strong>. If you’re writing to the prototypal model and you’re doing it correctly, your programs are a lot smaller. For one thing, you take out a lot of the silly redundancy, like 'I’m creating a variable of this type named That Type, initialized with new That Type.' You’re saying everything three times, and you tend not to do that in a prototypal language. But more than that, <strong>you can simulate the classical language in the prototypal language</strong>. You can’t do the other. Java is not powerful enough that you can write in a JavaScript style in Java; it’s just not good enough. JavaScript is, so you can do it the other way around, because<strong> it’s the more powerful of the models</strong>." (<a href="http://youtu.be/RO1Wnu-xKoY?t=24m8s">Link</a>)

<u><h5>Object.create (don't use <code>new</code>)</h5></u>
"I don’t use new anymore. I don’t need it. I’m thinking prototypally now, and when I’m thinking prototypally I can do everything I want to do with object.create. So I see this now as just a vestige; I don’t need it anymore. There’s also a hazard with new, that if you design a constructor that’s supposed to be used with new and either you, or one of your users, forgets to put the new prefix on it, instead of initializing a new object the instructor’s going to be clobbering the global object, damaging global variables and not doing useful work at all, and there’s no compile time warning or runtime warning of that. That’s a feature I don’t need to use." (<a href="http://youtu.be/RO1Wnu-xKoY?t=31m26s">Link</a>)

<u><h5>Functions and objects</h5></u>
"<strong>The best feature in the language, the good parts, the very best parts, are functions</strong>. We’ll talk about them <a href="https://www.youtube.com/watch?v=ya4UHuXNygM">next time</a>. So that’s all the objects. All the values in this language are objects, with two exceptions: null, and undefined." (<a href="">Link</a>)

<u><h5>JavaScript and C</h5></u>
"Syntactically, <strong>JavaScript is clearly a member of the C family of programming languages</strong>. It’s got the curly braces and all of that stuff. It differs from C mainly in its type system, which allows functions to be values." (<a href="">Link</a>)

<h3>Resources</h3>
<a href="http://youtu.be/RO1Wnu-xKoY">Crockford on JavaScript - Chapter 2: And Then There Was JavaScript [Video]</a><br>
<a href="http://abraham.cs.uml.edu/~heines/91.461/resources/CrockfordOnJavaScript/crockonjs-2-transcript.pdf">Crockford on JavaScript - Chapter 2: And Then There Was JavaScript [Full transcript]</a><br>