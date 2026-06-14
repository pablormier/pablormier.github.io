// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "a recent list of publications by categories in reversed chronological order.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-news",
          title: "news",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/news/";
          },
        },{id: "post-building-a-tiny-convex-optimization-layer-from-scratch-part-i",
        
          title: "Building a Tiny Convex Optimization Layer from Scratch (Part I)",
        
        description: "Part I of a from-scratch convex optimization layer series, deriving the Lagrangian and KKT system for a constrained projection problem.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/05/30/building-a-tiny-convex-optimization-layer-from-scratch-part-i/";
          
        },
      },{id: "post-making-graphviz-easier-to-use-from-python",
        
          title: "Making Graphviz easier to use from Python",
        
        description: "A short note on wasi-graphviz, easydot, and using LLMs to get through portability work.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/05/17/making-graphviz-easier-to-use-from-python/";
          
        },
      },{id: "post-smart-invaders-can-you-beat-them",
        
          title: "Smart Invaders: Can You Beat Them?",
        
        description: "A browser game for introducing genetic algorithms, where evolving Space Invaders-style enemies adapt to the player&#39;s strategy over time.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2020/03/01/Smart-invaders-can-you-beat-em/";
          
        },
      },{id: "post-a-tutorial-on-differential-evolution-with-python",
        
          title: "A tutorial on Differential Evolution with Python",
        
        description: "A hands-on Python introduction to Differential Evolution for black-box optimization, from a compact NumPy implementation to practical examples.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2017/09/05/a-tutorial-on-differential-evolution-with-python/";
          
        },
      },{id: "news-we-won-the-kaggle-competition-quot-open-problems-single-cell-perturbations-quot",
          title: 'We won the Kaggle competition &amp;quot;Open Problems - Single-Cell Perturbations&amp;quot;!',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/kaggle-award/";
            },},{id: "news-i-will-be-attending-the-embo-embl-ai-and-biology-symposium-heidelberg",
          title: 'I will be attending the EMBO-EMBL “AI and Biology” Symposium (Heidelberg)',
          description: "",
          section: "News",},{id: "news-presenting-corneto-at-embl-heidelberg",
          title: 'Presenting CORNETO at EMBL Heidelberg',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/embl-ai-24-post/";
            },},{id: "news-corneto-published-in-nature-machine-intelligence",
          title: 'CORNETO published in Nature Machine Intelligence',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/corneto-nature-machine-intelligence/";
            },},{id: "news-14th-place-in-the-arc-virtual-cell-challenge",
          title: '14th place in the Arc Virtual Cell Challenge',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/arc-virtual-cell-challenge/";
            },},{id: "news-seminar-talk-at-karolinska-on-biologically-informed-neural-networks",
          title: 'Seminar talk at Karolinska on biologically informed neural networks',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/karolinska-binn-seminar/";
            },},{id: "news-invited-talk-at-the-mia-seminar-series-broad-institute-of-mit-and-harvard",
          title: 'Invited talk at the MIA Seminar Series, Broad Institute of MIT and Harvard...',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/broad-mia-talk/";
            },},{id: "news-poster-accepted-at-biology-at-scale-2026",
          title: 'Poster accepted at Biology at Scale 2026',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/wellcome-biology-at-scale-poster/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%70%61%62%6C%6F.%72%6F%64%72%69%67%75%65%7A.%6D%69%65%72@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-inspire',
        title: 'Inspire HEP',
        section: 'Socials',
        handler: () => {
          window.open("https://inspirehep.net/authors/", "_blank");
        },
      },{
        id: 'social-kaggle',
        title: 'Kaggle',
        section: 'Socials',
        handler: () => {
          window.open("https://www.kaggle.com/pablormier", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0002-4938-4418", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=o8v__F8AAAAJ", "_blank");
        },
      },];
