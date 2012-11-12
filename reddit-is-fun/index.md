---
layout: page
title: "reddit is fun"
tagline: "Android reddit client"
---
{% include JB/setup %}

## Where to get it

[![Lite version on Google Play](/assets/images/get_it_on_play_logo_large.png)](http://play.google.com/store/apps/details?id=com.andrewshu.android.reddit)
Free version with optional ads

[![Pro version on Google Play](/assets/images/get_it_on_play_logo_large.png)](http://play.google.com/store/apps/details?id=com.andrewshu.android.redditdonation)
$1.99 golden platinum version

[Alternate downloads page if you cannot access Google Play](http://github.com/talklittle/reddit-is-fun/downloads)


## FAQ

### What's the difference between lite and pro?

Lite requires you to enable ads to activate pro features. Pro is a one-time $1.99 payment.

Pro features include:
* dual-pane tablet mode
* moderator features

### Where's the source code?

reddit is fun is currently closed source as of version 2.0 which was a rewrite.

[Diode](http://github.com/zagaberoo/diode) is an open source GPL fork of reddit is fun 1.3.

### What's the best way to contact you about bugs and suggestions?

My email on the [Google Play page](http://play.google.com/store/apps/details?id=com.andrewshu.android.reddit). Or [/u/talklittle](http://www.reddit.com/u/talklittle).

I welcome additions to these FAQs too.


## Usage FAQ

### How do I register an account?

[via the reddit website](https://ssl.reddit.com/login)

### How do I view the sidebar?

First you have to be within a subreddit, not the frontpage and not /r/all or /r/mod. Click the "i" icon in the top bar.

### Why do webpages and images reload when I rotate my device?

It's an Android WebView limitation. There's a hack involving setting a flag on the Activity, but it's bad and incompatible with my UI layout, so I don't use it.
