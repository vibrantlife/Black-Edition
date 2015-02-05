class Rating < ActiveRecord::Base
  belongs_to :volunteer
  belongs_to :dog
end
