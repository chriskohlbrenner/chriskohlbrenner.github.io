---
layout: post
title: "Scratching my own itch: a chrome extension story"
date: 2015-03-24 17:10:39 -0400
comments: true
categories: [Chrome Extensions, JavaScript, Front End]
---

When we submit pull requests on BitBucket, my coworkers and I will generally draw attention when they are net-negative, removing more lines of code than they add. In some cases, it's pretty obvious--entire files being deleted, etc. Oftentimes, however, it requires doing a bit of mental math to tally the difference between lines added and lines removed. For that reason, it's gratifying to "scratch my own itch" by installing [this extension](https://chrome.google.com/webstore/detail/net-lines-of-code/npjphkppofmfcohiffnkfjnehcaachgf) to do it for me.

{% img /images/chrome_extension.png %}

<!--more-->

The "problem" already had a solution of sorts, in the form of a short jQuery script a coworker had pulled together:

{% include_code chrome-extension/extension.js %}

A simple solution that, when run in the browser console, would log the offset. I just wanted to make it even simpler by removing that one extra step. That meant setting up a Chrome extension, which was a far easier process than I thought it might be.

<h3>A brief how-to</h3>

<ul>
  <li>Set up a new directory with a <code>manifest.json</code> file, with a <code>name</code>, <code>manifest_version</code> of 2, a <code>version</code>, </li>
  <li>To see it working, add an icon.png and list that file in <code>manifest.json</code> under <code>browser_action.default_icon</code>. By now, <code>manifest.json</code> should look something like this:
  {% highlight javascript %}
  {
    "name": "Hello World!",
    "manifest_version": 2,
    "version": "1.0",
    "description": "My first Chrome extension.",
    "browser_action": {
      "default_icon": "icon.png"
    }
  }
  {% endhighlight %}
  </li>
  <li>Go to <a href="chrome://extensions">chrome://extensions</a>, tick 'developer mode', click 'load unpacked extension', and select your new folder--note your icon appear in the top right of your browser, next to your other extensions.</li>
  <li>At this point, you have a Chrome extension! Of course, now you need to decide what you want it to do, but getting it started is that trivial. In my case, I didn't even keep the default icon, since I just want a script to run on certain domains.</li>
  <li>Publishing the extension requires a <a href="https://chrome.google.com/webstore/developer/dashboard">Chrome developer account</a> (which requires a $5 payment), which you can set up here. From there, publishing the extension just requires compressing the folder to a zip file (right-click the folder, compress) and uploading.</li>
</ul>


<h3>Resources</h3>
<a href="https://developer.chrome.com/extensions/getstarted">Google's documentation is pretty clear and helpful</a><br>
<a href="http://lifehacker.com/5857721/how-to-build-a-chrome-extension">Lifehacker has a decent intro tutorial.</a><br>