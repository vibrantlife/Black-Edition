class Volunteer < ActiveRecord::Base
  has_many :ratings
  has_many :dogs, :through => :ratings
end
