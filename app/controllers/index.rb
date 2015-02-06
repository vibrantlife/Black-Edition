get '/' do
  @all_dogs = Dog.all
  erb :index
end


get '/dogs/:id' do |id|
  @view_dog = Dog.find(id)

  erb :profile
end

get '/dogs/:id/new' do |id|
  @rate_dog = Dog.find(id)

  erb :rate
end

post '/dogs/:id/new' do
  @dog = Dog.find(params[:id])

  # new_rating = {affectionate: params[:affectionate], independent: params[:independent], playful: params[:playful], timid: params[:timid], good_with_kids: params[:good_with_kids], high_energy: params[:high_energy]}

  # if params[:splat] == "on"
  #   params[:splat] == true
  @rating = Rating.create(dog_id: params[:id])
  # else
  #   p "this didn't work"
  # end
  p "hi" * 100
  new_rating = params #hash of keys, keys to be updated with on/true
  p new_rating

  true_attributes = new_rating.select{|k,v| v == "on"}.keys
  p true_attributes
  true_attributes.each do |key|
    @symbol_key = @rating.send key
    @symbol_key = true
    p @symbol_key
  end

  # @rating.save
  # p @rating
end

# @rating.playful = true
# @rating."playful" = true

### we have to take into consideration the volunteer_id, dog_id, create a new rating with these parameters.
#Rating.create(volunteer_id: #, dog_id: #, new_rating)




