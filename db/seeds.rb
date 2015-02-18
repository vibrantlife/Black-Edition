require 'faker'

def seed_user(count)
  count.times {User.create(email: Faker::Internet.email, password: 'cheese')}
end

seed_user(10)
