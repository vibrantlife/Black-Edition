class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string  :title
      t.integer :isbn
      t.text  :img_url
      t.text  :widget
      t.text    :description
      t.belongs_to :category, index: true

      t.timestamps
    end
  end
end
