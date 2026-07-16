---
layout: post
title: Building a Tiny Convex Optimization Layer from Scratch (Part I)
date: 2026-05-30
last_modified_at: 2026-06-18
description: Part I of a from-scratch convex optimization layer series, deriving the Lagrangian and KKT system for a constrained projection problem.
categories: python optimization
read_time: 21
disqus_comments: true
related_posts: false
---

> **Work in progress.** This post is an evolving draft. I am still refining the
> presentation, notation, and references, so details may change as the
> series develops.
{: .block-warning}

{::nomarkdown}
{% capture notebook_exists %}{% file_exists assets/jupyter/tiny-convex-layer-01.ipynb %}{% endcapture %}
{% if notebook_exists == 'true' %}
  {% jupyter_notebook_inline 'assets/jupyter/tiny-convex-layer-01.ipynb' %}
{% else %}
  <p>Sorry, the notebook you are looking for does not exist.</p>
{% endif %}
{:/nomarkdown}
