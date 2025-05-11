---
layout: archive
title: Datascopio
excerpt: "A circular public display that visualizes daily insights from COTEC’s key areas of interest."
category: [portfolio, retail]
image: 
  feature: 
  teaser: teaser_datascopio.jpg
  thumb: 
  credit: 
  creditlink: 
tags: [p5js, fullstack]
---

<style>

figure.third img.crop-center {
	height: 200px;
	object-fit: cover;
	object-position: center center;
}

figure.third img.crop-top {
	height: 200px;
	object-fit: cover;
	object-position: top center;
}

figure.third img.no-crop {
	height: auto;
	object-fit: contain;
}


 .video-row {
    display: flex;
    align-items: stretch;
    gap: 16px;
    max-width: 100%;
    padding: 20px;
    justify-content: center;
  }

  .vimeo-wrapper,
  .youtube-wrapper {
    position: relative;
    height: min(70vh, 360px); /* máx 450px */
    background: black;
    flex-shrink: 0;
  }

  .vimeo-wrapper {
    aspect-ratio: 9 / 16;
    width: auto;
  }

  .youtube-wrapper {
    flex-grow: 1;
    aspect-ratio: 16 / 9;
  }

  .video-row iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  @media (max-width: 768px) {
    .video-row {
      flex-direction: column;
      align-items: center;
    }
    .vimeo-wrapper,
    .youtube-wrapper {
      width: 90%;
      height: auto;
      aspect-ratio: auto;
    }
    .vimeo-wrapper {
      aspect-ratio: 9 / 16;
      margin-bottom: 12px;
    }
    .youtube-wrapper {
      aspect-ratio: 16 / 9;
    }
  }

</style>

<figure class="third">
	<img src="https://live.staticflickr.com/65535/54321307746_9998be1902_c.jpg" class="crop-center">
	<img src="https://live.staticflickr.com/65535/54321721965_f22ec689d5_c.jpg" class="crop-center">
	<img src="https://live.staticflickr.com/65535/54321544604_964ebec185_c.jpg" class="crop-center">
	<figcaption>COTEC</figcaption>
</figure>


**Datascopio** is a real-time, multi-platform web application connected to COTEC’s circular public display on Bermúdez Street through www.datascopio.es. Every search made by users on their phones is instantly (or as soon as space allows) reflected on the public screen, turning personal curiosity into a shared street-level experience.
The project uses p5.js for word visualization, a custom shader for glitch effects, and generates a word soup from the search result by extracting key terms from current Spanish-language news related to COTEC’s thematic areas.

**Cient:** COTEC

**Software:** 1. p5js, 2. Shaders 3. Gnews Api, 4. Sockets.io, 5. nodejs

<div class="video-row">
  <!-- Vimeo vertical -->
  <div class="vimeo-wrapper">
    <iframe
      src="https://player.vimeo.com/video/1082524109?muted=1&loop=1&badge=0&autopause=0&background=1"
      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
      title="Vimeo vertical">
    </iframe>
  </div>

  <!-- YouTube horizontal -->
  <div class="youtube-wrapper">
    <iframe
      src="https://www.youtube.com/embed/TdPQnIUi8QY?si=E9sA7DKTcCaw6QzF&autoplay=1&mute=1&loop=1&playlist=TdPQnIUi8QY&controls=0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      title="YouTube horizontal">
    </iframe>
  </div>

    <!-- Vimeo vertical -->
  <div class="vimeo-wrapper">
    <iframe
      src="https://player.vimeo.com/video/1082682268?muted=1&loop=1&badge=0&autopause=0&background=1"
      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
      title="Vimeo vertical">
    </iframe>
  </div>
</div>


#### References

<ul>
<li><a href="https://cotec.es/noticias-cpt/inauguramos-el-escaparate-de-la-innovacion/ ">Inauguramos el <b>Escaparate de la Innovación</b> - Noticias COTEC</a></li>
</ul>
