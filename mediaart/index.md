---
layout: archive
title: "Media Art projects"
excerpt: ""
modified: 2015-01-01
image: 
  feature: lummoblocks_mediaArt.jpg
  thumb: Lummo_300x300.jpg
---

Here some projects I've been making:


<div class="tiles">
{% for post in site.categories.mediaart %}
  {% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles -->

