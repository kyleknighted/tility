# http://edgeguides.rubyonrails.org/rails_application_templates.html
generate(:controller, "Main")
route "root to: 'main#index'"
rake("db:create")
rake("db:migrate")

run "rm public/index.html"
run "guard init livereload"

inside('app/views/main') do
  run "touch index.html.erb"
end

environment 'config.middleware.insert_after(ActionDispatch::Static, Rack::LiveReload)', env: 'development'
