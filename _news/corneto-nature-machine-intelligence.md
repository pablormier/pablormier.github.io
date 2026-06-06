---
layout: post
title: CORNETO published in Nature Machine Intelligence
date: 2025-07-22
inline: false
related_posts: false
---

Our work on [CORNETO](https://corneto.org) is now published in [Nature Machine Intelligence](https://www.nature.com/articles/s42256-025-01069-9).

This has been a long journey that started around three years ago. The project kept growing beyond its initial scope, bringing together ideas from causal signaling, metabolism, optimization, and multi-sample network inference into a unified framework for discovering biological networks from omics data.

CORNETO provides a knowledge-driven optimization framework for reconstructing context-specific biological networks, including signaling, metabolic, and protein-protein interaction networks. Some of the main features are:

- a unified optimization core for expressing causal signaling, Flux Balance Analysis, Prize-Collecting Steiner Trees, and related problems with the same primitives;
- exact, solver-backed LP/MILP formulations;
- multi-sample inference to compare networks across samples, conditions, or patients;
- a modular API for adding new constraints, priors, and scoring functions;
- support for CVXPY and PICOS backends, with access to a broad range of mathematical optimization solvers.

Alongside the paper, Nature Machine Intelligence published a [News & Views article](https://www.nature.com/articles/s42256-025-01075-x) about CORNETO, and EMBL-EBI published a [research highlight](https://www.embl.org/news/science/corneto-machine-learning-to-decode-complex-omics-data/) covering the work. The code is available on [GitHub](https://github.com/saezlab/corneto).

This work would not have been possible without my co-authors Martin Garrido Rodriguez-Cordoba and Attila Gábor, or without Julio Saez-Rodriguez's help, patience, and support in supervising it. Thanks also to our funders through the European Union's PerMedCoE and DECIDER projects, and to everyone who provided feedback or helped test CORNETO over the years.

Thanks also to David Gomez-Cabrero and Jesper N. Tegnér for writing the News & Views article, and to Victoria Hatch for the EMBL-EBI news piece.
