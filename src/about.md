---
layout: base.njk
title: About
tags: main
css:
  - tailwind.css
js:
  - header.js
---
<main class="max-w-5xl p-4 mx-auto">
  <article class="my-24 max-w-3xl prose">
    <h1>About</h1>
    
    This web supplement accompanies *"{{meta.paper.title}}"*.
    
    This simple static website uses [HMA-EMA RWD Studies Catalogue](https://catalogues.ema.europa.eu/)'s metadata to generate sponsor- and study-level statistics about adherence to legislation and recommendations regarding the publication of protocols and results of post-authorisation studies (PAS) registered in the EU.

    Additionally, this website will aggregate information on the PAS status, the Risk Management Plan (RMP) in which the PAS is included, and the countries in which the PAS is conducted at sponsor level.

    All sources and further information are available on [GitHub]({{meta.github}}) and in the [paper]({{meta.paper.url}}).

  </article>
</main>