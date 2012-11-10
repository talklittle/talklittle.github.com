---
layout: post
category : frog-ball
tags : [frog-ball, announcement]
tagline: Day 12
---
{% include JB/setup %}

## Announcing Frog Ball

My current project is Frog Ball. It's an Android game inspired by a wonderful little gem from 1993, the SNES game [Sanrio World Smash Ball!](http://en.wikipedia.org/wiki/Sanrio_World_Smash_Ball!)

## What's done?

I've been working on the very basics for a while. I've been spending time familiarizing myself with OpenGL ES 2. Originally I wanted to make an iPhone game, and had been working towards that slowly. But I changed my mind and started over on a new game, Frog Ball.

It pains me to put up these images since they are utter shit right now. But since this is a devlog, who cares. The point is to show any and all progress, not to impress.

**The title screen:**

![title screen](/assets/images/frog-ball/2012-11-10_titlescreen.png)

**The host screen:**

![title screen](/assets/images/frog-ball/2012-11-10_hostscreen.png)

**The join screen:**

![title screen](/assets/images/frog-ball/2012-11-10_joinscreen.png)

**The game screen:**

![title screen](/assets/images/frog-ball/2012-11-10_practice.png)

As you can see, I'm using the wonderful [libgdx](http://libgdx.badlogicgames.com/) game framework for Android/desktop/HTML5.

What you can't see is that I'm also using the [AllJoyn framework](http://www.alljoyn.org/) for device-to-device communication. I've actually got this part working before doing the actual game. I figured it would be easier to design the game with networking up front, rather than write the full game and heavily refactor to add networking support.

It's been about 10 or 11 days since I started. I lost a day or two of that spent on [reddit is fun](/reddit-is-fun) instead. The time doesn't include all the time I spent in September/October learning OpenGL and iOS stuff. But that was for another project, now on my backburner, so let's say today is Day 12 for Frog Ball.

(Coincidentally I chose Day 12 to write [a very vague blog post](http://blog.andrewshu.com/2012/09/day-12.html) for one of the previous projects.)

## Target: Xmas

I'm aiming for a Christmas release for the [AllJoyn App Challenge](http://alljoynappchallenge.com) which has a submission deadline of December 27.


