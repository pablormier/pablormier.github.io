---
layout: post
title: Making Graphviz easier to use from Python
date: 2026-05-17
description: A short note on wasi-graphviz, easydot, and using LLMs to get through portability work.
categories: python wasm graphviz
disqus_comments: true
related_posts: false
---

I've been experimenting with making Graphviz easier to use from Python in more portable environments. The result is two small projects:

- [wasi-graphviz](https://github.com/pablormier/wasi-graphviz): run Graphviz from Python through WebAssembly/WASI, without needing a system Graphviz binary, Node.js, or a browser.
- [easydot](https://github.com/pablormier/easydot): a small Python API for rendering DOT graphs using the best available backend: native Graphviz, server-side WASM (via JavaScript), or browser-based WASM.

The goal is to make DOT rendering work more smoothly in notebooks, CI, and serverless environments, without requiring Graphviz binaries to be installed on the system.

I initially used Kimi K2.6 for this, because I had heard good things about the model. I have to say that I was greatly surprised by the performance and cost for developing the `wasi-graphviz` package. It managed to download the Graphviz C/C++ source, patch it to make it compatible with `wasm32-wasi`, set up the toolchain, and help package the result as a working Python library. The cost was ridiculous: around $1 for the first functional version.

This is the kind of project that I find super useful, but in the past I would really have hesitated to start because the effort vs. reward ratio was too high. LLMs make this type of small, well-defined project much easier to justify because getting through the boring parts takes much less time.

Here is an example of using `easydot` to draw a small DOT graph:

<div class="row justify-content-center">
  <div class="col-lg-10 col-md-12 col-12 my-3">
    {% include figure.liquid loading="lazy" path="assets/img/easydot/easydot-example.png" class="img-fluid rounded z-depth-1" zoomable=true %}
  </div>
</div>
