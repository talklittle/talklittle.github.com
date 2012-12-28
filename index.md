---
layout: fluid
title: talklittle's cool website
tagline: look at my projects
---
{% include JB/setup %}

<div class="row-fluid">
  <div class="span12">
    <div class="row-fluid">

      <div class="span4">
        <h2>reddit is fun</h2>
        <p><a href="reddit-is-fun"><img src="assets/images/redditisfun96.png" alt="reddit is fun logo" /></a></p>
      </div><!--/span-->

      <div class="span4">
        <h2>aww: reddit pictures widget</h2>
        <p><a href="aww-reddit"><img src="assets/images/awwicon.png" alt="reddit aww logo" /></a></p>
      </div><!--/span-->

      <div class="span4">
        <h2>Frog Ball (in beta)</h2>
        <p><a href="{{ site.categories.frog-ball.first.url }}"><img src="assets/images/frogball96.png" alt="Frog Ball logo" /></a></p>
{% for category in site.categories %}
{% if category[0] == "frog-ball" %}
<ul>
  {% assign pages_list = category[1] %}
  {% include JB/pages_list %}
</ul>
{% endif %}
{% endfor %}
      </div><!--/span-->

    </div><!--/row-->
  </div><!--/span-->
</div><!--/row-->

<a href="http://play.google.com/store/search?q=pub:TalkLittle">
  <img alt="Android app on Google Play"
       src="http://developer.android.com/images/brand/en_generic_rgb_wo_60.png" />
</a>
See my apps on Google Play


