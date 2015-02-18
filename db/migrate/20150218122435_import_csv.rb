class ImportCsv < ActiveRecord::Migration
  def change
    create_table :csv do |t|
      t.integer :survey_year
      t.string  :institution_name
      t.integer :institution_size
      t.integer :sex_offenses_forcible
      t.integer :aggravated_assault
      t.integer :burglary
      t.integer :motor_vehicle_theft



    end
  end
end
