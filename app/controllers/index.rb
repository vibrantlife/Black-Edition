# ---------- 7 restful routes ------------#

get "/logout" do
  session_logout
  redirect ('/')
end

get "/" do
  # index
  if session_logged_in?
    erb :homepage
  else
    erb :index
  end
end

get "/homepage" do

  erb :homepage
end
