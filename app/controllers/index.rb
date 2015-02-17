enable :sessions


get '/' do
  @user = User.find(session[:current_user_id]) if session[:current_user_id]
  erb :index
end

get '/login' do
  erb :log_in
end

get '/login' do
  erb :log_in
end

post '/login' do
  p params
  @user = User.find_by(username: params[:username])
    if @user.password == params[:password]
      session_set_current_user(@user)
      redirect '/'
    else
      redirect '/'
    end
end

delete '/logout' do
  session.delete :current_user_id
  session.delete :user_name
  redirect '/'
end

get '/register' do
  erb :register
end

post '/register' do
  @new_user = User.create(username: params[:user_name], password: params[:password])
  redirect '/'
end

get '/year' do
  @movies = Movie.where(year: params[:year]).order(:box_office_total)
  erb :movies
end
