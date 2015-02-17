class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :username
      t.string :password_hash
      t.integer :high_score_1996
      t.integer :high_score_1997
      t.integer :high_score_1998

      t.timestamps
    end

  end
end