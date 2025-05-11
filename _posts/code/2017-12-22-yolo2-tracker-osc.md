---
layout: article
title: Yolo2 Tracker OSC
excerpt: "Camera tracks pedestrians with Yolo2 -> Track their rectangle positions and dimensions -> Identify certain actions -> Send all filtered results by OSC (or others Network protocols if you wish) for a Real-Time use. I have this running around 17 Fps using a Nvidia 1060 graphics card"
category: code
image:
  feature:
  teaser: trackerYolo2_plaza_teaser.PNG
  thumb:
  credit:
  creditlink:
tags: [computervision, c++]
---

<figure class="one">
	<figcaption>Client example for Medialab-Prado</figcaption>
	<img src="https://c1.staticflickr.com/5/4601/25356852558_bbab6d98cc.jpg">
</figure>

This tool aims to offer an multitracking interactive controller for specific games using video input from surveillance cameras. OSC protocol available.

It works even for low lighting profiles. Darknet library ( yolo2 ) computes in GPU graphic card, so it's capable real time applications.

<figure class="one">
	<figcaption>Client example for Medialab-Prado</figcaption>
	<a href="https://medialab-prado.es/article/fachada_digital_informacion_tecnica">Medialab-Prado Technical Facade link</a>
	<img src="https://c1.staticflickr.com/5/4736/25356850868_dcac9ae3fb_c.jpg">
</figure>

Download executables at Medialab-Prado repository with [github repository](https://github.com/medialab-prado/RecursosFachada) some executables and Processing clients examples. Check sensor4Games folders -> yolo2

For developers, check [gihtub and README](https://github.com/carlesgutierrez/fachada-yolo2Tracking/).

Requirements:
This App has been tested with a Nvidia Pascal GPU 1060 under Windows10.
