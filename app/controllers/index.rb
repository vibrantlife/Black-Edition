get '/' do
  @all_dogs = Dog.all
  erb :index
end


get '/dogs/:id' do |id|
  @view_dog = Dog.find(id)

  erb :profile
end

get '/dogs/new/:id' do |id|
  @rate_dog = Dog.find(id)

  erb :rate
end



