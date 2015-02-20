require 'faker'
require 'csv'

#seeding users for the database
def seed_user(count)
  count.times {User.create(username: Faker::Name.first_name, email: Faker::Internet.email, password: 'cheese')}
end

seed_user(10)




