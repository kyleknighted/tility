generate(:controller, "Main")
route "root to: 'main#index'"
rake("db:create")
rake("db:migrate")

run "rm public/index.html"
run "guard init livereload"

inside('app/views/main') do
  run "touch index.html.erb"
end

file 'app/controllers/main_controller.rb', <<-CODE
  def index
  end
CODE

environment 'config.middleware.insert_after(ActionDispatch::Static, Rack::LiveReload)', env: 'development'
