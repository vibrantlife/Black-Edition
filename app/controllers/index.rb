get '/profile' do
  if session[:current_user_id] == nil
    @error = "you're not logged in"
    erb :help
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
 if @user != nil #&& @user.authenticate(params[:password])
      session_set_current_user(@user)
      #redirect to their profile page
      redirect('/profile')
  else

    @error = "invalid login"
  erb :help
 end
end

# #registration page
get '/register' do
  erb :register
end

post '/register' do
  @new_user = User.create(name: params[:name], handle: params[:handle], password: params[:password])
  if @new_user.valid?
      session_set_current_user(@new_user)
      redirect('/profile')
  else
    erb :register
  end
end

get '/logout' do
  #sets the current user id to nil
  # redirect to login page.
  session[:current_user_id] = nil
  redirect('/')

end



get '/' do
  # goes to view /index.erb
  
  erb :homepage
end


get '/profile' do

  erb :profile
end

get '/friends' do 

  erb :friends
end

get '/donate' do 

  erb :donate
end

get '/help' do 

  erb :help
end

get '/contact_info' do

  erb :contact_info
end


get '/wishlist/new' do
#return html form to create a new tweet
  erb :new_wish
end

post '/wishlist' do
  #create a new snack
  @wish = Wish.create(content: params[:content], url: params[:url], priority: params[:priority], user_id: session[:current_user_id])
  if @wish.valid?
    redirect '/'
  else
    erb :error
  end
end

get '/wishlistitem/:id' do 
  #display a specific snack
  erb :single_wish
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