require 'faker'

def seed_user(count)
  count.times {User.create(email: Faker::Internet.email, password: 'cheese')}
end

seed_user(10)


=begin
elementary school
snowy day - 310258
yo! yes? - 246936

teen angst
the skin i'm in - 2284218
the autobiogoraphy of malcom x - 92057

=end
