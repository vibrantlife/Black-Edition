
# client = Goodreads::Client.new(:api_key => 'KEY', :api_secret => 'SECRET')
# client = Goodreads::Client.new(Goodreads.configuration)

get '/' do

  erb :index
end

post '/login' do

  erb :books
end

post '/register' do

  erb :books
end

get '/books' do

erb :books
end


