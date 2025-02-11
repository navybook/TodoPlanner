class Task < ApplicationRecord
  belongs_to :user

  validates :title, presence: true, length: { maximum: 255 }
  validates :description, length: { maximum: 1000 }
  validates :status, presence: true
  enum status: { unfinished: 0, start: 1, completed: 2 }
end
