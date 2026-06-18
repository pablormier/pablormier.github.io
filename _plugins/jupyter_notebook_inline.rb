require "cgi"
require "open3"

module Jekyll
  class JupyterNotebookInlineTag < Liquid::Tag
    Liquid::Template.register_tag("jupyter_notebook_inline", self)

    def initialize(tag_name, markup, parse_context)
      super
      @markup = markup
    end

    def render(context)
      path = Liquid::Variable.new(@markup, @parse_context).render(context).to_s
      path = @markup.strip.delete_prefix("'").delete_suffix("'").delete_prefix('"').delete_suffix('"') if path.empty?

      site = context.registers[:site]
      source_path = File.expand_path(path.delete_prefix("/"), site.source)
      raise ArgumentError, "Notebook not found: #{path}" unless File.file?(source_path)

      stdout, stderr, status = Open3.capture3(
        "jupyter", "nbconvert",
        "--to", "html",
        "--template", "basic",
        "--TagRemovePreprocessor.enabled=True",
        "--TagRemovePreprocessor.remove_input_tags=remove-input",
        "--stdout",
        source_path
      )
      raise "nbconvert failed for #{path}: #{stderr}" unless status.success?

      stdout.gsub(/\{\{\s*['"]([^'"]+)['"]\s*\|\s*relative_url\s*\}\}/) do
        site.config["baseurl"].to_s + Regexp.last_match(1)
      end
    end
  end
end
