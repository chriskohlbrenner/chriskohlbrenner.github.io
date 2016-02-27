---
layout: post
title: "React Conf reactions"
date: 2016-02-27 16:43:32 -0500
comments: true
categories: ["React", "JavaScript", "Conferences", "Front End", "UI", "Functional Programming", "User Interface"]
---
The React.js Conf was a blast. All the talks were recorded and can be watched [here](https://www.youtube.com/playlist?list=PLb0IAmt7-GS0M8Q95RIc2lOM6nc77q1IY). My full bullet point notes are [here](/downloads/react_conf_notes.txt), but what follows are some more readable reactions to the conference.

First of all, a special thanks to the organizers and speakers. This was a very well run conference with some high-class talks. From breakfast Monday through to the closing reception on Tuesday, with the single exception of [jackhammer noises during some of the talks](https://twitter.com/kentcdodds/status/702201425133064192) (what are you gonna do about construction next door?), everything was very well done.

Moving on, I learned a ton, got to know some awesome members of this community, and met some incredible people who've influenced my career (by giving talks, authoring open-source, or otherwise helping me write better code). Here's a couple of my main takeaways, in no particular order.

<!--more-->

1. I came into the conference with React.js and Redux experience, but little to no knowledge of GraphQL, Relay, or React Native. I was not disappointed then, that the majority (maybe two-thirds?) of the talks addressed exactly those things. For a long time, React Native has been on my list of new tech to explore, as someone who's never written anything for mobile. GraphQL and Relay, meanwhile, could be directly applicable to my everyday work. And I'm of course always pleased to learn new things about what I already "know", like aspects of React performance that I haven't thought about.

2. If the majority of the talks addressed React.js, React Native, GraphQL, and Relay, the remainder focused on areas of tech that I rarely if ever consider. Talks covered subjects like [virtual reality](https://www.youtube.com/watch?v=ty2bFeOdGeI&index=7&list=PLb0IAmt7-GS0M8Q95RIc2lOM6nc77q1IY), [hardware](https://www.youtube.com/watch?v=GnIrNYtmRDg&index=8&list=PLb0IAmt7-GS0M8Q95RIc2lOM6nc77q1IY), and [graphics](https://www.youtube.com/watch?v=Xnqy_zkBAew&index=18&list=PLb0IAmt7-GS0M8Q95RIc2lOM6nc77q1IY). I may never focus the majority of my time on any of these, but it's eye-opening and motivating to see people pushing the limits of what can be done.

3. A few of my favorite talks:
    - Andy Matuschak, who worked on the gesture system for iOS, [presented some of the problems (and potential solutions) facing mobile gestures](https://www.youtube.com/watch?v=uBYPqb83C7k&list=PLb0IAmt7-GS0M8Q95RIc2lOM6nc77q1IY&index=9). I don't even do mobile, but his talk was engaging, entertaining, and informative.
    - [Isaac Salier-Hellendag announced Draft.js](https://www.youtube.com/watch?v=feUYwoLhE_4&index=3&list=PLb0IAmt7-GS0M8Q95RIc2lOM6nc77q1IY), a new open-source framework for building rich text editors. I've worked on exactly this problem, implementing a textarea that allows for Facebook-style (using `@`) mentions, so I totally resonated with his walkthrough of the problem and implementation, and I'm excited to give Draft.js a try.
    - Jared Forsyth addressed exactly the situation I'm in, providing [an overview of React, Redux, and Relay](https://www.youtube.com/watch?v=-jwQ3sGoiXg&index=34&list=PLb0IAmt7-GS0M8Q95RIc2lOM6nc77q1IY) (with discussions of ClojureScript and Om/next mixed in) and how to determine which to use and when.
    - Nicolas Gallagher, who's SUIT CSS project I've used, pushed things a step farther and proposed taking styles a step farther (moving CSS entirely into JS) in his [talk on React Native for Web](https://www.youtube.com/watch?v=RBg2_uQE4KM&index=22&list=PLb0IAmt7-GS0M8Q95RIc2lOM6nc77q1IY).
    - Jamison Dance stepped away from React long enough to discuss [Elm and what JavaScript can learn from it](https://www.youtube.com/watch?v=txxKx_I39a8&index=30&list=PLb0IAmt7-GS0M8Q95RIc2lOM6nc77q1IY) (read: immutability, types, pure functions). Fantastic talk with great examples and fun slides.

4. Any post-conference list would be incomplete without mentioning the things I'm excited to explore and implement:
    - As I already mentioned, I want to give Draft.js a long look and consider using it in production.
    - I was already interested in GraphQL and Relay, and want to take a few days to see if it could make sense at work.
    - I'm all for moving away from CSS in favor of JavaScript solutions, so I want to learn from React Native for Web and consider the OSS solutions for JS styles.
    - My app at work, like so many others, is slow on app initialization, so I want to consider how to improve that based on ideas presented at the conference.
    - I want to finally give React Native a try in a side project.
    - Finally, I'm already sold on ideas from functional programming like immutability and reducing side effects, but I want to check out Flow for gradual type checking and I want to learn Elm rather than only doing FP in JavaScript.