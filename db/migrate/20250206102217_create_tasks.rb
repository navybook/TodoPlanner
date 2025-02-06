class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :description
      t.datetime :due_date
      t.boolean :status, default: false, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
