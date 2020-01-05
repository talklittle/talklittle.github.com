---
layout: page
title: talklittle's cool website
tagline: look at my projects
---
{% include JB/setup %}

## rif is fun

*A Reddit client for Android. Formerly known as reddit is fun.*

[![rif is fun logo](assets/images/rifisfun96.png)](rif-is-fun/)

## Buffeo Daydream

*An interactive screensaver for Android 4.2 Jelly Bean.*

[![Buffeo logo](assets/images/buffeo96.png)](buffeo-daydream/)

## Frog Ball (in beta)

*A 2-player action/arcade game.*

[![Frog Ball logo](assets/images/frogball96.png)]({{ site.categories.frog-ball.first.url }})

{% for category in site.categories %}
{% if category[0] == "frog-ball" %}
<ul>
  {% assign pages_list = category[1] %}
  {% include JB/pages_list %}
</ul>
{% endif %}
{% endfor %}

