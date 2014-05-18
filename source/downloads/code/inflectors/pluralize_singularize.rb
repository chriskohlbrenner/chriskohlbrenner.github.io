"blog".pluralize      #=> "blogs"
"ruby".pluralize      #=> "rubies"
"sheep".pluralize     #=> "sheep"

"blog".pluralize(0)   #=> "blogs"
"blog".pluralize(1)   #=> "blog"
"ruby".pluralize(3)   #=> "rubies"

"blogs".singularize   #=> "blogs"
"rubies".singularize  #=> "ruby"
"sheep".singularize   #=> "sheep"