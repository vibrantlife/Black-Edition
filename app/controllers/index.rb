get '/profile' do
  if session[:current_user_id] == nil
    "you're not logged in"
  else
    erb :profile
  end
end

#login page
get '/login' do
  erb :login
end


post '/login' do
 #finds user with that handle
  @user = User.find_by(handle: params[:handle])
 if @user != nil && @user.authenticate(params[:password])
      session_set_current_user(@user)
      #redirect to their profile page
      redirect('/profile')
  else
  erb :login
 end
end

#registration page
get '/register' do
  erb :register
end

get '/logout' do
  #sets the current user id to nil
  # redirect to login page.
  session_logout_current_user
  redirect('/homepage')

end



get '/' do
  # goes to view /index.erb
  
  erb :index
end

get '/wishlistitem/new' do
#return html form to create a new tweet
  
end

post '/wishlist' do
  #create a new snack
end

get '/wishlistitem/:id' do 
  #display a specific snack
end

get '/wishlistitem/:id/edit' do 
  #return html form for editing snack
  
end

put '/wishlistitem/:id' do
  #updates a specific snack
  
  redirect '/'
end

delete '/wishlistitem/:id' do
  #delete a snack
  redirect '/homepage'
  p "8"* 100
end

get '/homepage' do
  erb :homepage
end