
# client = Goodreads::Client.new(:api_key => 'KEY', :api_secret => 'SECRET')
# client = Goodreads::Client.new(Goodreads.configuration)
get '/' do
  if session_logged_in?
    erb :books
  else
    erb :index
  end
end

get '/login' do
  @user = User.find_by(email: params[:email])
  p params
  if @user != nil && @user.authenticate(params[:password])
    session[:current_user_id] = @user.id
    @current_user = User.find(session[:current_user_id])
    redirect '/books'
  else
    redirect '/'
  end
end


get '/login' do
  #go to login page
  erb :index
end

post '/register' do
  @new_user = User.create(email: params[:email], password: params[:password])
  if @new_user
    session_set_current_user(@new_user)
    redirect '/books'
  end
end

get '/books' do

  erb :books
end

post '/logout' do
  session[:user_id] = nil
  redirect '/'
end


