class Dog < ActiveRecord::Base
  has_many :ratings
  has_many :volunteers, :through => :ratings
end
