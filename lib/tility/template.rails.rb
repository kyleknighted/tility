#################################
### TILITY RAILS APP TEMPLATE ###
###### © THE ABLE FEW 2013 ######
#################################

#Create default controller
generate(:controller, "Main")

# Create initial route
route "root to: 'main#index'"

# setup database
rake("db:create")
rake("db:migrate")

# drop default index file so it loads route
run "rm public/index.html"

# install guard and livereload for guard
run "guard init livereload"

# create default view
inside('app/views/main') do
  run "touch index.html.erb"
end

# remove tree from sprockets and only include default css
gsub_file 'app/assets/stylesheets/application.css', ' *= require_tree .', ' *= require "default"'

# change guard-livereload default port
gsub_file 'Guardfile', 'guard \'livereload\' do', 'guard \'livereload\', :api_version => \'2.3\' do'

# change default title to app name
gsub_file 'app/views/layouts/application.html.erb', \APP_TITLE\, @app_name, :api_version => \'2.3\' do'

# create default.js
create_file "app/assets/javascripts/default.js", "// Your default javascript file\n"

# add method for default view in controller
inject_into_file 'app/controllers/main_controller.rb', :after => 'class MainController < ApplicationController' do
  <<-RUBY

    def index
    end
  RUBY
end