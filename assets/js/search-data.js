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
        },{id: "post-smart-invaders-amp-58-can-you-beat-39-em",
        
          title: "Smart invaders&amp;#58; Can you beat &#39;em?",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2020/03/01/Smart-invaders-can-you-beat-em/";
          
        },
      },{id: "post-a-tutorial-on-differential-evolution-with-python",
        
          title: "A tutorial on Differential Evolution with Python",
        
        description: "an example of a blog post with disqus comments",
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
          section: "News",},{
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
