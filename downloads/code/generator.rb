class GenerateAssignments
  def make_index!
    template_doc = File.open("app/views/index.html.erb")
    template = ERB.new(template_doc.read)
    File.write("_site/index.html", template.result(binding))
  end  
end