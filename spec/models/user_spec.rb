require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { User.new(name: "Test", email: "test@example.com", password: "password") }

  it "is valid with a name, email, and password" do
    expect(user).to be_valid
  end

  it "is invalid without a name" do
    user.name = nil
    user.valid?
    expect(user.errors[:name]).to include("can't be blank")
  end

  it "is invalid without an email" do
    user.email = nil
    user.valid?
    expect(user.errors[:email]).to include("can't be blank")
  end

  it "is invalid without a password" do
    user.password = nil
    user.valid?
    expect(user.errors[:password]).to include("can't be blank")
  end

  it "is invalid with a duplicate email address" do
    user.save
    other_user = User.new(email: user.email)
    other_user.valid?
    expect(other_user.errors[:email]).to include("has already been taken")
  end

  it "is invalid with a password shorter than 6 characters" do
    user.password = "12345"
    user.valid?
    expect(user.errors[:password]).to include("is too short (minimum is 6 characters)")
  end
end
