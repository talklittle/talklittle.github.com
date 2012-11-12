---
layout: page
title: talklittle's cool website
tagline: look at my projects
---
{% include JB/setup %}

## reddit is fun

[![reddit is fun logo](assets/images/redditisfun96.png)](reddit-is-fun)

## aww: reddit pictures widget

[![reddit aww logo](assets/images/awwicon.png)](aww-reddit)

## Frog Ball (in development)

[![frog silhouette](assets/images/Frog_silhouette.jpg)]({{ site.categories.frog-ball.first.url }})

{% for category in site.categories %}
{% if category[0] == "frog-ball" %}
<ul>
  {% assign pages_list = category[1] %}
  {% include JB/pages_list %}
</ul>
{% endif %}
{% endfor %}
