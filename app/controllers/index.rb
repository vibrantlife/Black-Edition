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
  #displys two categories of books with buttons.
  @isbn = retrieve_isbn(9780140501827)
  @title = display_book_title(9780140501827)
  @widget = display_book_widget(9780140501827)
  @picture = book_covers(9780140501827)
  erb :books
end


get '/logout' do
  session.clear
  redirect '/'
end


