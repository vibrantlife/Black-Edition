require 'smarter_csv'

get "/logout" do
  #log out user
  session_logout
  redirect ('/')
end

get "/" do
  # login page. once logged in will go to homepage
  if session_logged_in?
    erb :homepage
  else
    erb :index
  end
end

get "/homepage" do
  #
  erb :homepage
end

get "/data/sexoffenses" do
  # content_type :json

erb :sexoffenses
end
