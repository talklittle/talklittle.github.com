---
layout: page
title: talklittle's cool website
tagline: look at my projects
---
{% include JB/setup %}

## Current projects

### Three Cheers for Tildes

*A Tildes.net client for Android and iOS.*

[![Three Cheers logo](assets/images/threecheers96.png)](three-cheers/)

## Past projects

### rif is fun

*A Reddit client for Android. Formerly known as reddit is fun.*

[![rif is fun logo](assets/images/rifisfun96.png)](rif-is-fun/)

### Buffeo Daydream

*An interactive screensaver for Android 4.2 Jelly Bean.*

[![Buffeo logo](assets/images/buffeo96.png)](buffeo-daydream/)

### Frog Ball

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

