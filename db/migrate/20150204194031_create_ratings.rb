class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.references :volunteer
      t.references :dog
      t.boolean :affectionate
      t.boolean :independent
      t.boolean :playful
      t.boolean :timid
      t.boolean :good_with_kids
      t.boolean :high_energy
      t.timestamps
    end
  end
end
