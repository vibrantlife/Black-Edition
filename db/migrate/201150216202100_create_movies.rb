class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.string :title
      t.string :year
      t.string :box_office_total
      t.string :imdbrating
      t.string :director
      t.string :actors

    end

  end
end
