---
layout: post
title: Building a Tiny Convex Optimization Layer from Scratch (Part I)
date: 2026-05-30
description:
categories: python optimization
disqus_comments: true
related_posts: false
---

{::nomarkdown}
{% assign jupyter_path = 'assets/jupyter/tiny-convex-layer.ipynb' | relative_url %}
{% capture notebook_exists %}{% file_exists assets/jupyter/tiny-convex-layer.ipynb %}{% endcapture %}
{% if notebook_exists == 'true' %}
  {% jupyter_notebook jupyter_path %}
{% else %}
  <p>Sorry, the notebook you are looking for does not exist.</p>
{% endif %}
{:/nomarkdown}
