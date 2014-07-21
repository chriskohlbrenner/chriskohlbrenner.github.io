---
layout: post
title: "JavaScript's historical context (according to Douglas Crockford)"
date: 2014-07-21 10:01:39 -0400
comments: true
categories: 
---
<strong>Summary</strong>: I'm working my way through a few <a href="https://github.com/bolshchikov/js-must-watch">must-watch videos about JavaScript</a>. If you know JavaScript, pretend to know JavaScript, or hope to learn JavaScript, check out those videos. Or read this and the <a href="/blog/2014/07/21/intro-to-javascript-crockford">following post</a> (and save yourself three hours of video-watching), in which I pull some of my favorite quotes from what <a href="https://en.wikipedia.org/wiki/Douglas_Crockford">Douglas Crockford</a> has to say about JavaScript.

<strong>Notes</strong>: The quotes below represent some of the key statements (as I judge them) in order of their appearance in Crockford's <a href="http://youtu.be/JxAXlJEmNMg">first</a> and <a href="http://youtu.be/RO1Wnu-xKoY">second</a> talks on JavaScript. Read together, they outline the main trajectory of Crokford's presentation, but they are not intended to replace the entirety of the talk. The first 50 minutes of the first talk, which cover the history of programming before 1970, are excluded from this post, not because they're unimportant (they are!), but because it was difficult to pull single quotes that represented the content. All emphases mine.

<h3>Crockford on JavaScript's historical context, distilled into key quotes</h3>
<u><h5>Innovation since the '70s</h5></u>
"The other thing we've seen is an end to CPU innovation. <strong>We used to see a lot of really radical new designs happening all the time, but we don't see that happening anymore</strong>. Basically we've got three architectures that we use for most of our stuff: virtually all the computers are on Intel, most of the game platforms are on Power PCs, most of the mobile devices are on ARM, and that's it. Nobody's making new stuff, nothing radical, it's just refinements of stuff that's been happening for several decades.

"We're doing even worse in operating systems. It used to be that every model of every machine had its own operating system, and that came with a lot of obvious inefficiency, so we've pushed that down and now we have just two: we've got Unix which was developed in the '70s, and we've got Windows that was developed in the '80s. Of the two, Unix is obviously the better one, but there's no innovation happening in operating systems. Basically we've been rewriting the same systems for 40 years. That's just not where we do innovation. <strong>Where we do innovation is in programming languages, and that's been going on for quite a long time.</strong>"  (<a href="http://youtu.be/JxAXlJEmNMg?t=56m50s">link</a>)

<!--more-->

<u><h5>Leaps</h5></u>
"Software development comes in leaps, and our leaps are much farther apart than the hardware experiences. Moore's Law lets the hardware leap every two years; we leap more like every twenty years. Again, <strong>basically we need a generation to retire before we can get the good new ideas going</strong>, so despite the fact that we're always talking about innovation and how we love innovation and we're always innovating, <strong>we tend to be extremely conservative in the way we adopt new technology</strong>." (<a href="http://youtu.be/JxAXlJEmNMg?t=1h21m5s">Link</a>)

<u><h5>The beginning of JavaScript</h5></u>
"Basically, [<a href="https://en.wikipedia.org/wiki/Brendan_Eich#CEO_appointment_and_resignation">Brendan Eich</a>] took these components: he took the <strong>syntax of Java</strong>, he took <strong>the function model of Scheme</strong>--which was brilliant, one of the best ideas in the history of programming languages--and he took <strong>the prototype objects from Self</strong>. He put them together in a really interesting way, really fast; he completed the whole thing in a couple of weeks. It's a shame that he wasn't given the freedom that Xerox had to spend a decade to get this right. Instead of ten years it was more like ten days, and that was it. I challenge any language designer to come up with a brand new design from scratch in ten days and then release it to the world and call it done and see what happens with that.

"One of the consequences of it was that there are parts of it that are just awful. If they'd had more time they probably would have recognized that and fixed it, but they didn't. Netscape was not a company that had time to get it right, which is why there's no longer a Netscape.

"But despite that, <strong>there is absolutely deep profound brilliance in this language, and this language is succeeding in places where many other languages have failed because of that brilliance; it's not accidental that JavaScript has become the most popular programming language in the world</strong>." (<a href="http://youtu.be/JxAXlJEmNMg?t=1h37m34s">Link</a>)

<u><h5>A great time to be a programmer</h5></u>
"One thing that's different now than in the '50s and '60s is there are lot of computers out there, and there are a lot of people writing programs now. It's possible to get a <strong>community of people</strong> even if you have a minor language, enough to do useful things, to do a lot of group work. You've got a group large enough to justify writing books, which was something we didn't have back in the '50s and '60s. So I think <strong>this is a great time to be a programmer</strong>. We have lots of choices, and we need to be smart about making those choices and be open to accepting the new ideas, because there are a lot of new ideas out there that we shouldn't be rejecting just because they're unfamiliar and we don't see the need for them. There are actually a lot of good ideas in all of these languages, not least of which is JavaScript..." (<a href="http://youtu.be/JxAXlJEmNMg?t=1h40m44s">Link</a>)

<u><h5>Mythology of innovation</h5></u>
"Now, if you were here last time you’ll remember I went through the history of everything that ever happened, starting with The Big Bang, going through The Dawn of Man, and then finally there was JavaScript. The reason I did that was because understanding the context in which this stuff happens is really important to understanding what we have now. Without that understanding you’re consumed by <strong>mythology which has no truth in it</strong>, that the history of innovation has been one thing after another where the new, good thing always displaces the old stuff. That’s not how it works, generally. <strong>Generally the most important new innovations are received with contempt and horror and are accepted very slowly, if ever</strong>. That’s an important bit of knowledge to have, in the case of JavaScript." (<a href="http://youtu.be/RO1Wnu-xKoY?t=18s">Link</a>)

<u><h5>JavaScript has good parts</h5></u>
"Having that background [understanding history and innovation] allowed me to make the first important discovery of the 21st century, which was that <strong>JavaScript has good parts</strong>. This was an <strong>unexpected discovery</strong>, and when I tried to share it with the rest of the community there was a huge amount of skepticism; a lot of people refused to believe it was possible that JavaScript had any redeeming value whatsoever. In fact, it has very, very good parts. But I’m getting a little ahead of the story, so let’s back up a little bit." (<a href="http://youtu.be/RO1Wnu-xKoY?t=1m44s">Link</a>)

<u><h5>Why it's called JavaScript (Netscape-Sun history)</h5></u>
"It was very clear at the time that there was a lot of excitement about Java and the Netscape browser, and Sun and Netscape decided they needed to work together against Microsoft because if they didn’t join forces Microsoft would play them off against each other and they’d both lose. The biggest point of contention in that arrangement was what to do with LiveScript. Sun’s position was: "Well, we’ll put Java into the Netscape browser, we’ll kill LiveScript, and that’ll be that." And Netscape said no, that they really believed in the HyperCard-like functionality, and they wanted a simpler programming model in order to capture a much larger group of programmers.

"So there was an impasse, and the relationship almost broke up, when I think Marc Andreessen--and I have been able to document this, but <strong>people have told me--Marc Andreessen, maybe as a joke, suggested: 'let’s change the name to JavaScript.' And it worked</strong>! Except that Sun claimed ownership of the trademark. Even though they had nothing to do with the language and they tried to kill the language, they said ‘we own the trademark, but we’ll give you a license to use the trademark’. Netscape said 'great, an exclusive license, only we can call it JavaScript, that’s fine'." (<a href="http://youtu.be/RO1Wnu-xKoY?t=7m4s">Link</a>)

<u><h5>The destruction of Microsoft</h5></u>
"At Microsoft they’d been watching this with some alarm, particularly when folks at Netscape were saying that Netscape Navigator was going destroy Microsoft. Microsoft said ‘oh, we don’t want to be destroyed’. It turned out Netscape Navigator didn’t destroy Microsoft. In fact, <strong>the software that is going to destroy Microsoft is Windows Mobile</strong>." (<a href="http://youtu.be/RO1Wnu-xKoY?t=8m28s">Link</a>)

<u><h5>JavaScript naming confusion</h5></u>
"What should we call the language? There’s a lot of confusion. Some people still think that JavaScript, JScript, and ECMAScript are three different languages, and that’s not the case. It’s three silly names for one silly language. JavaScript isn’t actually an open name, which is surprising in that this is the language of the world’s biggest open system. It’s a trademark now of Oracle, and we don’t know what they’re going to do with that. We probably should call it ECMAScript, except it’s such an awful thing to call it."


<h3>Resources</h3>
<a href="http://youtu.be/JxAXlJEmNMg">Crockford on JavaScript - Volume 1: The Early Years [Video]</a><br>
<a href="https://teaching.cs.uml.edu/~heines/91.461/resources/CrockfordOnJavaScript/crockonjs-1-transcript.pdf">Crockford on JavaScript - Volume 1: The Early Years [Full transcript]</a><br>
<a href="http://youtu.be/RO1Wnu-xKoY">Crockford on JavaScript - Chapter 2: And Then There Was JavaScript [Video]</a><br>
<a href="http://abraham.cs.uml.edu/~heines/91.461/resources/CrockfordOnJavaScript/crockonjs-2-transcript.pdf">Crockford on JavaScript - Chapter 2: And Then There Was JavaScript [Full transcript]</a><br>