---
layout: article
title: Yolo2 Tracker OSC
excerpt: "Real-time pedestrian tracking using Yolo2 and OSC: detect people via surveillance camera, identify their positions and actions, and send live data via OSC for interactive applications. Runs at ~17 FPS on a Nvidia GTX 1060."
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
	<figcaption>Yolo2 Tracker for Medialab-Prado's Digital Facade</figcaption>
	<img src="/images/yoloTracker.png">
</figure>

This tool is designed as a real-time multi-tracking system for interactive games and installations using video input from surveillance cameras. It identifies pedestrians, tracks their position and size, detects specific actions, and sends this filtered data via the **OSC protocol** (other network protocols can also be integrated).

Built with the **YOLOv2 object detection model** using the **Darknet library**, it processes video on the GPU, allowing real-time performance — tested at around **17 FPS** on a **Nvidia GTX 1060**.

The system performs reliably even in **low-light environments**, making it suitable for urban settings or nighttime installations.

<figure class="one">
	<img src="https://www.medialab-matadero.es/sites/default/files/import/ftp_medialab/2/2416/500_0.png">
	<figcaption>Medialab-Prado’s Digital Facade</figcaption>
</figure>

**→ [More info about Medialab-Prado’s Digital Facade](https://www.medialab-matadero.es/en/news/technical-information-digital-facade-0)**

---

### Get the App

If you're a client or user, you can download executable versions and Processing client examples from the [Medialab-Prado Github repository](https://github.com/medialab-prado/RecursosFachada), under the `sensor4Games/yolo2` folders.

### For Developers

Check out the source code and documentation on the main [GitHub repository](https://github.com/carlesgutierrez/fachada-yolo2Tracking/).

---

### Requirements

- OS: Windows 10  
- GPU: Nvidia Pascal series (tested on GTX 1060)  
- Dependencies: Darknet, OpenCV, OSC support (e.g. ofxOSC for Processing or liblo for C++)

