"""Shared display defaults for notebooks embedded in the blog."""

from __future__ import annotations


def apply_blog_style() -> None:
    """Make generated notebook figures blend with the site theme."""

    try:
        import matplotlib as mpl
    except ImportError:
        mpl = None

    if mpl is not None:
        mpl.rcParams.update(
            {
                "figure.facecolor": "none",
                "axes.facecolor": "none",
                "savefig.facecolor": "none",
                "savefig.edgecolor": "none",
                "savefig.transparent": True,
            }
        )

    try:
        from IPython import get_ipython
    except ImportError:
        return

    ipython = get_ipython()
    if ipython is None:
        return

    ipython.run_line_magic("matplotlib", "inline")
    ipython.run_line_magic(
        "config",
        "InlineBackend.print_figure_kwargs = {'bbox_inches': 'tight'}",
    )
