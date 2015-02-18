require 'faker'
require 'csv'

#seeding users for the database
def seed_user(count)
  count.times {User.create(email: Faker::Internet.email, password: 'cheese')}
end

seed_user(10)


#seeding files for d3
def load_data filename
  CSV.foreach(filename, headers: true) do |row|
    p row
  end
end

load_data criminal.csv
load_data disciplinary.csv


