enable :sessions


post '/' do
  user = User.find_by(username: params[:username])
  if user != nil && user.authenticate(params[:password])
    session[:username] = user.username
    session[:user_id] = user.id
    session[:password] = params[:password]
    session[:logged_in] = true
    redirect '/homepage'
  else
    @error = "you must do the thing"
  end
end

post '/logout' do
  session[:username] = nil
  session[:user_id] = nil
  session[:password] = nil
  session[:logged_in] = false

  redirect '/'
end


post '/create/user' do
  if params[:password].blank? && params[:username].blank?
    @error = "You must type in something!"
    erb :create_user
  elsif params[:password].blank?
    @error = "You must type in a password!"
    erb :create_user
  else
    new_user = User.create(username: params[:username], password: params[:password], email: params[:email])
    session[:username] = new_user.username

    redirect '/'
  end
end
