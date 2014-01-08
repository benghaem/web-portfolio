---
title: a grand adventure
date: 2013-08-12 23:42 UTC
tags: Musings
colorClass: CCmutedGreen
headerImg: True
imgWrapLoc: 33
---

I am currently in the middle of finalizing the development of my portfolio site and thought that it would be a good time to report how the process has progressed so far and what I have learned.

When I first began this project early this summer I was somewhat confused as to the direction I wanted to travel. I began by thinking very big and looking at options like a DJanjo based blog or some other backed system. However, as I experimented with those systems I realized that they were much more than what I needed and I finally settled on utilizing a static-site generator for my project.

I began my static-site generator search with FlaskREADMORE,  a very nice python based static site generator. But, Flask posed a large problem. I wanted to utilize layouts similar to a PHP style include and I also felt that Flask was far too restrictive on its use case.

I moved away some of my work from Flash and found Middleman, the current generator that I use. Middleman was a happy mix of layouts, control, and static pages. Middleman also marked my first foray into Ruby. Ruby is an interesting language and works well with the web environment. I happily and quickly set up a development environment on OSX, but I found that when I returned to my Windows desktop many problems with the installs of Ruby I attempted.

Instead of continuing to beat my head against a likely simple problem I decided to utilize VirtualBox to create development Ubuntu machine. This worked splendidly. Besides from some minor unity bugs the virtual machine ran very well and easily installed Ruby and the necessary gems. I then utilized Nginx to serve the generated files to the local network for testing. All in all the development process became much smoother.

From a design standpoint I settled on flat design. Flat design is an interesting idea and I feel that when utilized effectively can make for very attractive design and UX. I embraced flat design and decided that I would also theme my four main pages based on color. Red for the home page, orange for the projects page, blue for the test bed and green for the blog. I decided that I wanted each page to be visually consistent, but also showcase the color chosen.