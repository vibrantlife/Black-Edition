# client = Goodreads::Client.new(:api_key => 'KEY', :api_secret => 'SECRET')
# client = Goodreads::Client.new(Goodreads.configuration)
get '/' do
  if session_logged_in?
    erb :books
  else
    erb :index
  end
end

post '/login' do
  @user = User.find_by(email: params[:email])
  if @user != nil && @user.authenticate(params[:password])
    session[:current_user_id] = @user.id
    @current_user = User.find(session[:current_user_id])
    redirect '/s/books'
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
    redirect '/s/books'
  end
end

before '/s/*' do
  redirect '/login' unless session_current_user
end

get '/s/books' do
  #display all books
  @widget = display_book_widget(310258)
  @picture = book_covers(9780140501827)
  erb :books
end


get '/logout' do
  session.clear
  redirect '/'
end


