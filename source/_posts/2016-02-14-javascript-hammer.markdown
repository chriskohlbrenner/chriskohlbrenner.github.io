---
layout: post
title: "The hammer of JavaScript (and other tools for other nails)"
date: 2016-02-08 11:10:04 -0500
comments: true
categories: ["JavaScript", "Command Line", "Workflow", "Non-Code"]
---
_The one where I get a harsh reminder to question my instincts from a real-life experience of [this XKCD comic](https://xkcd.com/1319/)._

As a mental exercise, a friend proposed the following potential interview question: given a directory with 10,000 files of text, how would you extract all the phone numbers from that directory into a single file?

My immediate thought: this would be a basic assessment of someone's knowledge of: 

1. regular expressions to match patterns of numbers
2. how to programmatically read/write files
3. basic algorithmic complexity for iterating through files quickly.

I even knew how I'd implement it: use node's filesystem module to read the files, parse them for regex matches, and write all matches to a new file.

{% img right /images/hammer-nail.jpg 300 %}

I was intrigued enough that I decided to prove it out. I wrote a basic phone number regex by hand (`\d{3}(-|\s|\.)?\d{3}(-|\s|\.)?\d{4}\` (for 3 digits, 3 digits, and 4 digits separated by hyphens, periods, spaces, or nothing), and looked into popular phone number regexes. I realized how unfamiliar I am with [Node's filesystem module](https://nodejs.org/api/fs.html) (`readdir` and `readFile` and `writeFile`). Then I got curious about [publishing npm packages](https://docs.npmjs.com/getting-started/publishing-npm-packages). Before I knew it, I'd spent a couple hours and produced a [somewhat polished npm project](https://www.npmjs.com/package/collect-phone-numbers) for this hypothetical task.

And it was all wrong.

<!--more-->

The thought process I used was logical. My work as a software engineer focuses almost entirely on the web, JavaScript, build tools, UI features, HTTP servers. I'm comfortable with databases, front- and back-end code, version control, and countless other things. But that's a small subset of software! Classic hammer/nail.

To Wikipedia:
{% blockquote Wikipedia https://en.wikipedia.org/wiki/Software "Software"  %}
Software: any set of instructions that directs a computer to perform specific tasks or operations.
{% endblockquote %}

Software is about problem-solving. But problems can't be solved well without being understood. And they won't be well understood if we assume we should use the same solution every time. There's something to be said for using the tools you know, but software also requires a humility to recognize when a given tool is the wrong one.

In this case, I skipped the step of analyzing the problem. I didn't think about the specifics of the problem, the tradeoffs of time, or the alternative solutions I could choose. This was a one-time, approximate task. It was unlikely to be repeated often enough to make automating worthwhile. And yet I instinctually went with what I knew, implementing a "good", "complete" solution that was really just a picture of overengineering.

{% img left https://imgs.xkcd.com/comics/automation.png 300 %}

For a problem like this, why use another language or abstraction when it can be done via the command line, the text interface for the computer itself and a much more direct interface with the filesystem? Why use a language like JavaScript that's best suited for the web or pull in Node just for the sake of using a tool I know?

These are questions I won't soon forget to ask myself when I take on a new problem. Hopefully that'll prevent me from falling into traps that webcomics are made of. I know for sure that, next time I'm presented with a problem of finding text within a filesystem, I'll remember that tools like `grep` were made for exactly that. A simpler, less time-instensive, and more appropriate solution.

`egrep "\b[[:digit:]]{3}(-|\s|.)?[[:digit:]]{3}(-|\s|.)?[[:digit:]]{4}\b" ./* > ./nums.txt`