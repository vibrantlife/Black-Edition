require 'json'


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
  erb :books
end

get '/s/books/elementary' do
  p params
  @elementary = Book.where(category_id: 1)
  erb :elementary
  @elementary.to_json
end

get '/s/books/widget' do
  content_type :json
  p params
  @widget_show = Book.find(params[:id])
  @widget_show.to_json
end

get '/s/books/teens' do
  @teens = Book.where(category_id: 2)
  @teens.to_json
end


get '/logout' do
  session.clear
  redirect '/'
end


