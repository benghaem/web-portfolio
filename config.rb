###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
helpers do
#  def listTags
#   tagsList = []
#     blog.articles.each do |article|
#       article.tags.each do |tagname|
#         if tagsList.include?(tagname) != true
#           tagsList.push(tagname)
#         end
#       end 
#     end
#     return tagsList 
#   end
#   def listYears(years)
#   	yearsList = []
#     years.each do |year|
#     	if yearsList.include?(year) != true
#     		yearsList.push(year)
# 		end
# 	end
# 	return yearsList
#   end
#   def listMonths(months)
#   	monthsList = []
#     months.each do |month|
#     	if monthsList.include?(month) != true
#     		monthsList.push(month)
# 		end
# 	end
# 	return monthsList
#   end
 def listTags
  tagsList = []
  tagsListFull = []
  tagsListOrder = []
    blog.articles.each do |article|
      article.tags.each do |tagname|
        if tagsList.include?(tagname) != true
          tagsList.push(tagname)
        end
          tagsListFull.push(tagname)
      end 
    end
    tagsList.each do |checkTag|
        tagsListOrder.push( [tagsListFull.count(checkTag).to_i ,checkTag] )
    end
    tagsListOrder = tagsListOrder.sort { |x, y| y[0] <=> x[0] }
    return tagsListOrder
    end

def listYears()
  	yearsList = []
    blog.articles.each do |article|
    	if yearsList.include?(article.date.strftime('%Y')) != true
    		yearsList.push(article.date.strftime('%Y'))
		end
	end
	return yearsList
	end

def listMonths(year)
    monthsList=[]
    	blog.articles.each do |article|
    	    if article.date.strftime('%Y') == year
    	        if monthsList.include?([article.date.strftime('%m'),article.date.strftime('%B')]) != true
    	            monthsList.push([article.date.strftime('%m'),article.date.strftime('%B')])
    	        end
    	    end
	    end
	return monthsList
	end
end

###




# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
activate :livereload

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'css'

set :js_dir, 'js'

set :images_dir, 'imgs'

activate :blog do |blog|
    blog.prefix = "blog"
    blog.layout = "blog_article"
    blog.paginate = true
    blog.page_link = "p:num"
    blog.taglink = "tags/:tag.html"
    blog.tag_template = "tag.html"
    blog.calendar_template = "calendar.html"
end

# Project Page Template

page "/projects/*", :layout => "projects_preview"

page "/projects/*/raw/*", :layout => false

activate :directory_indexes

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_path, "/Content/images/"
end
