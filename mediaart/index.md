---
layout: archive
title: "Media Art projects"
excerpt: "Projects"
modified: 2015-01-01
image: 
  feature: lummoblocks_mediaArt.jpg
  thumb: Lummo_300x300.jpg
---

Here i will post the media projects i've done. 

<div class="tiles">
{% for post in site.categories.mediaart %}
  {% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles -->

