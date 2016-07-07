---
layout: post
title: "D3 and react faux DOM"
date: 2016-07-06 19:56:50 -0400
comments: true
categories: ["User Interface", "UI", "JavaScript", "Front End", "React", "D3", "Data Visualization"]
---
**Author's Note:** This post makes [my original post exploring React + D3](/blog/2015/06/23/react-d3/) obselete. I strongly recommend `react-faux-dom` ([on Github](https://github.com/Olical/react-faux-dom)) over my previous post's suggestion.

<hr>

**TL;DR**, Hear it straight from the lib author: Oliver Caldwell wrote [this blog post](http://oli.me.uk/2015/09/09/d3-within-react-the-right-way/) about `react-faux-dom`, which enables a cleanly organized and powerful combination of React and D3.

That post in four bullet points:

 - D3 works by **mutating** the DOM. Select a DOM element, append children, etc.
 - React works by **reconciling** the DOM. Build a tree, compare to DOM, determine which elements to add/remove/change.
 - DOM mutation (like D3 does) and DOM reconciliation (like React does) don't work together so well.
 - `react-faux-dom` makes a fake DOM to support D3. It might seem silly, but it enables us to support D3 while remaining within React.

(**Note**: regarding the second bullet, [this post from the React docs](https://facebook.github.io/react/docs/reconciliation.html) is worth a reread.)

Using a fake DOM means we can drop D3 scripts into a React component's `render()` function and it'll just work. It was trivial to prove out in a production PR:

{% include_code react-faux-dom/sparkline.js %}

Rendering a sparkline is as simple as `<Sparkline width={500} height={500} max={10} data={[1, 3, 2, 5, 4]} interpolation={"basis"} />`. We get the benefits of React semantics AND the D3 API, both neatly organized in their respective places.

I consider it a clear win to maintain React component organization while leveraging the power of all that D3 offers, but I suppose what it comes down to is this:

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">For me, it&#39;s about worrying about the right &quot;lines&quot; to draw in your app, then fill the few shapes those lines create with garbage and ship.</p>&mdash; Ryan Florence (@ryanflorence) <a href="https://twitter.com/ryanflorence/status/702538809569726464">February 24, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

So many code design decisions boil down to the border between things. The interface. The "line" between where React component code belongs and where D3 code belongs. Ultimately, this still leaves us to fill in the lines with whatever we choose to write, but this library's placement of the "line" is an improvement over anything else I've seen.

As the author writes, "All [React and D3] concepts remain the same, react-faux-dom is just the glue in the middle." This clean separation is hugely helpful in writing dataviz React components with D3.