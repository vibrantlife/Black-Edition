
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
  #go to login page
  erb :index
end


post '/login' do
  @user = User.where(email: params[:email])
  session_authenticate params[:email], params[:password]
  if @user != nil
    redirect '/'
  end
  # erb :books
end

post '/register' do
  @new_user = User.create(email: params[:email], password: params[:password])
  if @new_user
    session_set_current_user(@new_user)
    redirect '/books'
  else
  erb :index
end
end

get '/books' do

  erb :books
end


