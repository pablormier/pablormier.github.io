$(document).ready(function () {
  // add toggle functionality to abstract, award and bibtex buttons
  $("a.abstract").click(function () {
    $(this).parent().parent().find(".abstract.hidden").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.award").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.bibtex").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden").toggleClass("open");
  });
  $("a").removeClass("waves-effect waves-light");

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
      offset: 100,
    });
  }

  let jupyterTheme = determineComputedTheme();

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    const iframe = this;
    let resizeFrameRequest = null;
    let resizeObserver = null;
    let mutationObserver = null;
    $(iframe).attr("scrolling", "no");
    $(iframe).css("overflow", "hidden");

    const getJupyterFrameDocument = () => {
      try {
        return iframe.contentWindow && iframe.contentWindow.document;
      } catch {
        return null;
      }
    };

    const resizeJupyterFrame = () => {
      if (resizeFrameRequest) {
        window.cancelAnimationFrame(resizeFrameRequest);
      }

      resizeFrameRequest = window.requestAnimationFrame(() => {
        const iframeDocument = getJupyterFrameDocument();
        if (!iframeDocument || !iframeDocument.body || !iframe.parentElement) {
          resizeFrameRequest = null;
          return;
        }

        const body = iframeDocument.body;
        const bodyTop = body.getBoundingClientRect().top;
        const contentElements = Array.from(body.children);
        const contentHeight = contentElements.length
          ? contentElements.reduce((height, child) => {
              return Math.max(height, child.getBoundingClientRect().bottom - bodyTop);
            }, 0)
          : body.scrollHeight;

        iframe.parentElement.style.paddingBottom = `${contentHeight + 10}px`;
        resizeFrameRequest = null;
      });
    };

    const disconnectJupyterFrameObservers = () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
      if (mutationObserver) {
        mutationObserver.disconnect();
        mutationObserver = null;
      }
    };

    const observeJupyterFrameContent = (iframeDocument) => {
      disconnectJupyterFrameObservers();

      if ("ResizeObserver" in window) {
        resizeObserver = new ResizeObserver(resizeJupyterFrame);
        Array.from(iframeDocument.body.children).forEach((child) => resizeObserver.observe(child));
      }

      if ("MutationObserver" in window) {
        mutationObserver = new MutationObserver(() => {
          if (resizeObserver) {
            resizeObserver.disconnect();
            Array.from(iframeDocument.body.children).forEach((child) => resizeObserver.observe(child));
          }
          resizeJupyterFrame();
        });
        mutationObserver.observe(iframeDocument.body, { childList: true, subtree: false });
      }
    };

    const applyJupyterFrameStyles = () => {
      const iframeDocument = getJupyterFrameDocument();
      if (!iframeDocument || !iframeDocument.head || !iframeDocument.body) {
        return;
      }

      if (!iframeDocument.head.querySelector("link[data-al-folio-jupyter-css]")) {
        const cssLink = iframeDocument.createElement("link");
        cssLink.href = "../css/jupyter.css";
        cssLink.rel = "stylesheet";
        cssLink.type = "text/css";
        cssLink.dataset.alFolioJupyterCss = "true";
        cssLink.addEventListener("load", resizeJupyterFrame);
        iframeDocument.head.appendChild(cssLink);
      }
      iframeDocument.documentElement.style.overflow = "hidden";
      iframeDocument.body.style.overflow = "hidden";

      if (jupyterTheme == "dark") {
        $(iframeDocument.body).attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      }

      observeJupyterFrameContent(iframeDocument);
      resizeJupyterFrame();
      window.setTimeout(resizeJupyterFrame, 250);
    };

    $(iframe).on("load", disconnectJupyterFrameObservers);
    $(iframe).on("load", applyJupyterFrameStyles);
    applyJupyterFrameStyles();
    $(window).on("resize", resizeJupyterFrame);
  });

  // trigger popovers
  $('[data-toggle="popover"]').popover({
    trigger: "hover",
  });
});
